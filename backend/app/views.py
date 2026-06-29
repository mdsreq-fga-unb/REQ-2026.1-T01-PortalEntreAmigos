from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly, IsAdminUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.decorators import action
from .serializers import RegistroSerializer, LoginSerializer, EventoSerializer, ItemDoacaoSerializer, DoacaoSerializer, construir_link_confirmacao, validar_complexidade_senha, enviar_email_brevo
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.contrib.auth.tokens import default_token_generator
from django.http import HttpResponse
from django.db import transaction
from django.core.mail import send_mail
from django.conf import settings
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
from .models import Evento, ItemDoacao, Doacao, CodigoRecuperacaoSenha
import random, threading
from django.utils import timezone
from datetime import timedelta

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

    def perform_destroy(self, instance):
        if instance.status != Doacao.Status.PENDENTE:
            from rest_framework.exceptions import ValidationError
            raise ValidationError("Apenas doações pendentes podem ser excluídas.")
        instance.delete()


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



class RelatorioDoacoesPDFView(APIView):
    permission_classes= [IsAuthenticated]            
    
    def get(self, request, evento_id):
        evento = Evento.objects.filter(id=evento_id).first()
        if not evento:
            return Response({'detail': 'Campanha não encontrada.'}, status=404)

        if not request.user.is_staff:
            return Response(
                {'detail': 'Apenas administradores podem exportar relatórios.'},
                status=403
            )

        doacoes = (
            Doacao.objects
            .filter(item__evento=evento)
            .select_related('item', 'usuario', 'usuario__perfil')
            .order_by('item__nome', 'usuario__first_name')
        )

        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="doacoes_{evento.id}.pdf"'

        doc = SimpleDocTemplate(response, pagesize=A4, topMargin=2 * cm, bottomMargin=2 * cm)
        styles = getSampleStyleSheet()
        elementos = []

        elementos.append(Paragraph(f'Relatório de Doações — {evento.nome}', styles['Title']))
        elementos.append(Spacer(1, 8))
        elementos.append(Paragraph(
            f'Período: {evento.data_inicio} a {evento.data_fim}', styles['Normal']
        ))
        elementos.append(Spacer(1, 20))

        dados = [['Doador', 'CPF', 'Item', 'Qtd.', 'Status', 'Data']]
        for d in doacoes:
            cpf = getattr(getattr(d.usuario, 'perfil', None), 'cpf', '—') or '—'
            dados.append([
                d.usuario.first_name or '—',
                cpf,
                d.item.nome,
                str(d.quantidade),
                d.get_status_display(),
                d.criado_em.strftime('%d/%m/%Y %H:%M'),
            ])

        tabela = Table(dados, repeatRows=1)
        tabela.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#E97D25')),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
            ('FONTSIZE', (0, 0), (-1, -1), 9),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
            ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#f8f8f8')]),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
            ('TOPPADDING', (0, 0), (-1, -1), 6),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ]))
        elementos.append(tabela)

        if not doacoes.exists():
            elementos.append(Spacer(1, 20))
            elementos.append(Paragraph('Nenhuma doação registrada para esta campanha.', styles['Normal']))

        doc.build(elementos)
        return response


class EsqueciSenhaView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email', '').strip()
        if not email:
            return Response({'erro': 'O e-mail é obrigatório.'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.filter(email__iexact=email, is_active=True).first()
        mensagem_generica = 'Se esse e-mail estiver cadastrado, um código de verificação será enviado em instantes.'

        if not user:
            return Response({'mensagem': mensagem_generica}, status=status.HTTP_200_OK)

        codigo = str(random.randint(10000, 99999))
        CodigoRecuperacaoSenha.objects.update_or_create(
            user=user,
            defaults={'codigo': codigo}
        )

        corpo_email = (
            f"Olá {user.first_name},\n\n"
            f"Recebemos uma solicitação para redefinir a senha da sua conta no Portal Entre Amigos.\n\n"
            f"Seu código de verificação é:\n\n"
            f"    {codigo}\n\n"
            f"Este código é válido por 15 minutos.\n"
            f"Se você não solicitou isso, apenas ignore este e-mail."
        )

        def enviar():
            enviar_email_brevo(user.email, user.first_name, corpo_email)

        thread = threading.Thread(target=enviar)
        thread.daemon = True
        thread.start()

        return Response({'mensagem': mensagem_generica}, status=status.HTTP_200_OK)

class RedefinirSenhaView(APIView):
    """Valida o código de 5 dígitos e redefine a senha do usuário."""
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email', '').strip()
        codigo = request.data.get('codigo', '').strip()
        nova_senha = request.data.get('nova_senha', '')
        confirmar_senha = request.data.get('confirmar_senha', '')

        if not email or not codigo or not nova_senha or not confirmar_senha:
            return Response({'erro': 'Todos os campos são obrigatórios.'}, status=status.HTTP_400_BAD_REQUEST)

        if nova_senha != confirmar_senha:
            return Response({'erro': 'As senhas não coincidem.'}, status=status.HTTP_400_BAD_REQUEST)

        erro_senha = validar_complexidade_senha(nova_senha)
        if erro_senha:
            return Response({'erro': erro_senha}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.filter(email__iexact=email).first()
        if not user:
            return Response({'erro': 'Código inválido ou expirado.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            registro = user.codigo_recuperacao
        except CodigoRecuperacaoSenha.DoesNotExist:
            return Response({'erro': 'Código inválido ou expirado.'}, status=status.HTTP_400_BAD_REQUEST)

        # Verifica expiração de 15 minutos
        if timezone.now() - registro.criado_em > timedelta(minutes=15):
            registro.delete()
            return Response({'erro': 'Este código expirou. Solicite um novo.'}, status=status.HTTP_400_BAD_REQUEST)

        if registro.codigo != codigo:
            return Response({'erro': 'Código inválido ou expirado.'}, status=status.HTTP_400_BAD_REQUEST)

        # Tudo válido: atualiza a senha e remove o código
        user.set_password(nova_senha)
        user.save()
        registro.delete()

        return Response({'mensagem': 'Senha redefinida com sucesso! Faça login com sua nova senha.'}, status=status.HTTP_200_OK)


from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import CardTransparenciaSerializer
from .models import CardTransparencia

class CardTransparenciaViewSet(viewsets.ModelViewSet):
    queryset = CardTransparencia.objects.all().order_by('-criado_em')
    serializer_class = CardTransparenciaSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    parser_classes = (MultiPartParser, FormParser)