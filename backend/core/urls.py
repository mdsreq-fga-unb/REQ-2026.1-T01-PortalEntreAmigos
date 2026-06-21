from django.contrib import admin
from rest_framework.routers import DefaultRouter
from django.urls import path, include
from app.views import RegistroUsuarioView, LoginUsuarioView, UserProfileView, EventoViewSet, ItemDoacaoViewSet, DoacaoViewSet

router = DefaultRouter()
router.register('eventos', EventoViewSet)
router.register('itens-doacao', ItemDoacaoViewSet)
router.register('doacoes', DoacaoViewSet, basename='doacao')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/cadastro/', RegistroUsuarioView.as_view(), name='registro_usuario'),
    path('api/login/', LoginUsuarioView.as_view(), name='login_usuario'),
    path('api/perfil/', UserProfileView.as_view(), name='perfil_usuario'),
    path('api/', include(router.urls)),
]

