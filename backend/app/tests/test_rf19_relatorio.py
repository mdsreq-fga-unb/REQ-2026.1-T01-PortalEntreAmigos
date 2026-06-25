import pytest
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from rest_framework import status


@pytest.mark.django_db
class TestAtivacaoConta:
    def test_ativar_conta_com_token_valido(self, api_client, usuario_criado):
        usuario_criado.is_active = False
        usuario_criado.save()
        uid = urlsafe_base64_encode(force_bytes(usuario_criado.pk))
        token = default_token_generator.make_token(usuario_criado)
        response = api_client.post('/api/ativar-conta/', {'uid': uid, 'token': token}, format='json')
        assert response.status_code == status.HTTP_200_OK
        usuario_criado.refresh_from_db()
        assert usuario_criado.is_active is True

    def test_ativar_conta_sem_dados(self, api_client):
        response = api_client.post('/api/ativar-conta/', {}, format='json')
        assert response.status_code == status.HTTP_400_BAD_REQUEST


@pytest.mark.django_db
class TestRF19RelatorioPDF:
    """RF19 — Exportar relatório de doações em PDF."""

    def test_admin_exporta_pdf(self, admin_client, evento_criado, item_doacao, api_client, usuario_autenticado):
        api_client.force_authenticate(user=usuario_autenticado)
        api_client.post('/api/doacoes/', {'item': item_doacao.id, 'quantidade': 7}, format='json')

        response = admin_client.get(f'/api/eventos/{evento_criado.id}/relatorio-doacoes/')
        assert response.status_code == status.HTTP_200_OK
        assert response['Content-Type'] == 'application/pdf'
        assert len(response.content) > 100

    def test_usuario_comum_nao_exporta(self, api_client, evento_criado, usuario_autenticado):
        response = api_client.get(f'/api/eventos/{evento_criado.id}/relatorio-doacoes/')
        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_evento_inexistente_retorna_404(self, admin_client):
        response = admin_client.get('/api/eventos/99999/relatorio-doacoes/')
        assert response.status_code == status.HTTP_404_NOT_FOUND
