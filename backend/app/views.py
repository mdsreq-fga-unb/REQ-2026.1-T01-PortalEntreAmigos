from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly, IsAdminUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.decorators import action
from .models import Evento, ItemDoacao, Doacao
from .serializers import RegistroSerializer, LoginSerializer, EventoSerializer, ItemDoacaoSerializer, DoacaoSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.contrib.auth.tokens import default_token_generator

class RegistroUsuarioView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)  # Permite acesso sem estar logado
    authentication_classes = []
    serializer_class = RegistroSerializer


class LoginUsuarioView(APIView):
    permission_classes = (AllowAny,)
    authentication_classes = []
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except AuthenticationFailed as exc:
            return Response({'detail': str(exc)}, status=status.HTTP_401_UNAUTHORIZED)
        user = serializer.validated_data['user']
        is_administrador = user.is_staff or user.is_superuser
        refresh = RefreshToken.for_user(user)
        return Response(
            {
                'nome': user.first_name,
                'email': user.email,
                'cpf': user.perfil.cpf if hasattr(user, 'perfil') and user.perfil.cpf else "",
                'telefone': user.perfil.telefone if hasattr(user, 'perfil') and user.perfil.telefone else "",
                'role': 'ADMIN' if is_administrador else 'USER',
                'is_admin': is_administrador,
                'groups': list(user.groups.values_list('name', flat=True)),
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            },
            status=status.HTTP_200_OK,
        )


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        return Response(
            {
                'nome': user.first_name,
                'email': user.email,
                'cpf': user.perfil.cpf if hasattr(user, 'perfil') and user.perfil.cpf else "",
                'telefone': user.perfil.telefone if hasattr(user, 'perfil') and user.perfil.telefone else "",
            },
            status=status.HTTP_200_OK,
        )

    def put(self, request, *args, **kwargs):
        user = request.user
        data = request.data

        nome = data.get('nome')
        email = data.get('email')
        cpf = data.get('cpf')
        telefone = data.get('telefone')

        if not nome or not nome.strip():
            return Response({'nome': 'Nome é obrigatório.'}, status=status.HTTP_400_BAD_REQUEST)
        if not email or not email.strip():
            return Response({'email': 'E-mail é obrigatório.'}, status=status.HTTP_400_BAD_REQUEST)

        if email != user.email and User.objects.filter(email=email).exists():
            return Response({'email': 'Este e-mail já está em uso.'}, status=status.HTTP_400_BAD_REQUEST)

        user.first_name = nome
        user.email = email
        user.username = email
        user.save()

        from .models import PerfilUsuario
        perfil, created = PerfilUsuario.objects.get_or_create(user=user)

        if cpf:
            cpf_limpo = ''.join(filter(str.isdigit, cpf))
            if cpf_limpo != perfil.cpf:
                from .serializers import is_valid_cpf
                if not is_valid_cpf(cpf_limpo):
                    return Response({'cpf': 'CPF inválido.'}, status=status.HTTP_400_BAD_REQUEST)
                if PerfilUsuario.objects.filter(cpf=cpf_limpo).exists():
                    return Response({'cpf': 'Este CPF já está cadastrado.'}, status=status.HTTP_400_BAD_REQUEST)
                perfil.cpf = cpf_limpo
        else:
            perfil.cpf = None

        if telefone:
            telefone_limpo = ''.join(filter(str.isdigit, telefone))
            if len(telefone_limpo) not in (10, 11):
                return Response({'telefone': 'O telefone deve ter 10 ou 11 dígitos (incluindo DDD).'}, status=status.HTTP_400_BAD_REQUEST)
            perfil.telefone = telefone_limpo
        else:
            perfil.telefone = None

        perfil.save()

        return Response(
            {
                'nome': user.first_name,
                'email': user.email,
                'cpf': perfil.cpf or "",
                'telefone': perfil.telefone or "",
            },
            status=status.HTTP_200_OK,
        )


class EventoViewSet(viewsets.ModelViewSet):
    queryset = Evento.objects.all()
    serializer_class = EventoSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class DoacaoViewSet(viewsets.ModelViewSet):
    serializer_class = DoacaoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Doacao.objects.select_related('usuario', 'usuario__perfil', 'item', 'item__evento').all()
        
        # Se for um usuário comum (não-admin), ele só pode ver as próprias promessas.
        # Mas admins podem filtrar ou ver tudo.
        if not self.request.user.is_staff and not self.request.user.is_superuser:
            queryset = queryset.filter(usuario=self.request.user)
        else:
            # Admins também podem usar o filtro de minhas
            minhas = self.request.query_params.get('minhas')
            if minhas == 'true':
                queryset = queryset.filter(usuario=self.request.user)

        evento_id = self.request.query_params.get('evento')
        if evento_id:
            queryset = queryset.filter(item__evento_id=evento_id)
        return queryset

    def perform_create(self, serializer):
        # O usuário autenticado é salvo automaticamente como o doador
        serializer.save(usuario=self.request.user)

    @action(detail=True, methods=['post'], permission_classes=[IsAdminUser])
    def confirmar(self, request, pk=None):
        """Marca uma promessa de doação como RECEBIDA (somente admins)."""
        doacao = self.get_object()
        if doacao.status == Doacao.Status.RECEBIDA:
            return Response({'detail': 'Esta doação já foi confirmada.'}, status=status.HTTP_400_BAD_REQUEST)
        doacao.status = Doacao.Status.RECEBIDA
        doacao.save()
        # O signal já irá recalcular as quantidades do ItemDoacao
        return Response(DoacaoSerializer(doacao).data, status=status.HTTP_200_OK)


class ItemDoacaoViewSet(viewsets.ModelViewSet):
    queryset = ItemDoacao.objects.all()
    serializer_class = ItemDoacaoSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    # Filtra itens pelo evento: /api/itens-doacao/?evento=1
    def get_queryset(self):
        queryset = ItemDoacao.objects.all()
        evento_id = self.request.query_params.get('evento')
        if evento_id:
            queryset = queryset.filter(evento_id=evento_id)
        return queryset

class AtivarContaView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        uid_b64 = request.data.get('uid')
        token = request.data.get('token')

        if not uid_b64 or not token:
            return Response(
                {"erro": "Dados de ativação ausentes."}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            uid = force_str(urlsafe_base64_decode(uid_b64))
            user = User.objects.get(pk=uid)
            
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response(
                {"erro": "Link de ativação inválido ou corrompido."}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        if default_token_generator.check_token(user, token):
            
            if user.is_active:
                return Response(
                    {"mensagem": "Sua conta já estava ativada. Pode fazer login!"}, 
                    status=status.HTTP_200_OK
                )

            user.is_active = True
            user.save()
            return Response(
                {"mensagem": "Conta ativada com sucesso! Bem-vindo ao Apoia+."}, 
                status=status.HTTP_200_OK
            )
            
        else:
            return Response(
                {"erro": "Este link de ativação expirou ou já foi utilizado."}, 
                status=status.HTTP_400_BAD_REQUEST
            )