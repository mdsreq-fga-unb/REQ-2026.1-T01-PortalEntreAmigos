from django.contrib import admin
from django.urls import path
from app.views import RegistroUsuarioView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/cadastro/', RegistroUsuarioView.as_view(), name='registro_usuario'),
]
