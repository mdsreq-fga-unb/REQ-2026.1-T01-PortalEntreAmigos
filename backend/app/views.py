from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.models import User
from rest_framework import viewsets
from .models import Evento, ItemDoacao, Doacao
from .serializers import RegistroSerializer, LoginSerializer, EventoSerializer, ItemDoacaoSerializer, DoacaoSerializer
from rest_framework_simplejwt.tokens import RefreshToken

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
                'role': 'ADMIN' if is_administrador else 'USER',
                'is_admin': is_administrador,
                'groups': list(user.groups.values_list('name', flat=True)),
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            },
            status=status.HTTP_200_OK,
        )

class EventoViewSet(viewsets.ModelViewSet):
    queryset = Evento.objects.all()
    serializer_class = EventoSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class DoacaoViewSet(viewsets.ModelViewSet):
    queryset = Doacao.objects.all()
    serializer_class = DoacaoSerializer
    permission_classes = [IsAuthenticated]
    
class ItemDoacaoViewSet(viewsets.ModelViewSet):
    queryset = ItemDoacao.objects.all()
    serializer_class = ItemDoacaoSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
     # Filtra itens pelo evento: /api/doacao/?evento=1
    def get_queryset(self):
        queryset = ItemDoacao.objects.all()
        evento_id = self.request.query_params.get('evento')
        if evento_id:
            queryset = queryset.filter(evento_id=evento_id)
        return queryset