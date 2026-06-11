from django.contrib import admin
from django.urls import path
from app.views import RegistroUsuarioView, LoginUsuarioView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/cadastro/', RegistroUsuarioView.as_view(), name='registro_usuario'),
    path('api/login/', LoginUsuarioView.as_view(), name='login_usuario'),
]
