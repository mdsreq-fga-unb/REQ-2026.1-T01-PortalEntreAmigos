from django.contrib import admin
from rest_framework.routers import DefaultRouter
from django.urls import path, include
from app.views import (
    RegistroUsuarioView, LoginUsuarioView, UserProfileView,
    EventoViewSet, ItemDoacaoViewSet, DoacaoViewSet,
    AtivarContaView, RelatorioDoacoesPDFView,
    EsqueciSenhaView, RedefinirSenhaView, CardTransparenciaViewSet
)

router = DefaultRouter()
router.register('eventos', EventoViewSet)
router.register('itens-doacao', ItemDoacaoViewSet)
router.register('doacoes', DoacaoViewSet, basename='doacao')
router.register('transparencia', CardTransparenciaViewSet, basename='transparencia')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/cadastro/', RegistroUsuarioView.as_view(), name='registro_usuario'),
    path('api/login/', LoginUsuarioView.as_view(), name='login_usuario'),
    path('api/perfil/', UserProfileView.as_view(), name='perfil_usuario'),
    path('api/ativar-conta/', AtivarContaView.as_view(), name='ativar-conta'),
    path('api/esqueci-senha/', EsqueciSenhaView.as_view(), name='esqueci-senha'),
    path('api/redefinir-senha/', RedefinirSenhaView.as_view(), name='redefinir-senha'),
    path('api/eventos/<int:evento_id>/relatorio-doacoes/', RelatorioDoacoesPDFView.as_view(), name='relatorio_doacoes'),
    path('api/', include(router.urls)),
]

from django.conf import settings
from django.views.static import serve

# Serve media files em todos os ambientes (dev e produção).
# Para alto tráfego, migrar para Nginx ou armazenamento externo (S3).
urlpatterns += [
    path('media/<path:path>', serve, {'document_root': settings.MEDIA_ROOT}),
]
