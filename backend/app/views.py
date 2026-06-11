from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import RegistroSerializer, LoginSerializer

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
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        is_administrador = user.groups.filter(name__iexact='administrador').exists()

        return Response(
            {
                'nome': user.first_name,
                'email': user.email,
                'role': 'ADMIN' if is_administrador else 'USER',
                'is_admin': is_administrador,
                'groups': list(user.groups.values_list('name', flat=True)),
            },
            status=status.HTTP_200_OK,
        )