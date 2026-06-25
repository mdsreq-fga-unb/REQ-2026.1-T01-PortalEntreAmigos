import pytest
from rest_framework import status
from app.models import Doacao, ItemDoacao


@pytest.mark.django_db
class TestRF10ProgressoMeta:
    """RF10 — Progresso da meta de arrecadação."""

    def test_progresso_geral_evento(self, evento_criado, item_doacao, usuario_autenticado, api_client):
        api_client.force_authenticate(user=usuario_autenticado)
        api_client.post(
            '/api/doacoes/',
            {'item': item_doacao.id, 'quantidade': 25},
            format='json',
        )
        item_doacao.refresh_from_db()
        assert item_doacao.quantidade_prometida == 25
        assert item_doacao.progresso == 25.0
        evento_criado.refresh_from_db()
        assert evento_criado.progresso_geral == 25.0

    def test_progresso_recebido_apos_confirmacao(self, evento_criado, item_doacao, usuario_autenticado, api_client, admin_client):
        api_client.force_authenticate(user=usuario_autenticado)
        doacao_resp = api_client.post(
            '/api/doacoes/',
            {'item': item_doacao.id, 'quantidade': 40},
            format='json',
        )
        admin_client.post(f'/api/doacoes/{doacao_resp.data["id"]}/confirmar/')
        item_doacao.refresh_from_db()
        assert item_doacao.quantidade_recebida == 40
        assert item_doacao.progresso_recebido == 40.0


@pytest.mark.django_db
class TestRF11RegistrarDoacao:
    """RF11 — Registrar promessa de doação."""

    def test_usuario_registra_doacao(self, api_client, usuario_autenticado, item_doacao):
        response = api_client.post(
            '/api/doacoes/',
            {'item': item_doacao.id, 'quantidade': 5},
            format='json',
        )
        assert response.status_code == status.HTTP_201_CREATED
        assert Doacao.objects.filter(usuario=usuario_autenticado, item=item_doacao).exists()

    def test_doacao_requer_autenticacao(self, api_client, item_doacao):
        response = api_client.post(
            '/api/doacoes/',
            {'item': item_doacao.id, 'quantidade': 5},
            format='json',
        )
        assert response.status_code == status.HTTP_401_UNAUTHORIZED


@pytest.mark.django_db
class TestRF12AtualizarSaldo:
    """RF12 — Atualizar saldo ao confirmar recebimento."""

    def test_confirmar_atualiza_quantidade_recebida(self, api_client, admin_client, usuario_autenticado, item_doacao):
        api_client.force_authenticate(user=usuario_autenticado)
        doacao_resp = api_client.post(
            '/api/doacoes/',
            {'item': item_doacao.id, 'quantidade': 10},
            format='json',
        )
        item_doacao.refresh_from_db()
        assert item_doacao.quantidade_recebida == 0

        admin_client.post(f'/api/doacoes/{doacao_resp.data["id"]}/confirmar/')
        item_doacao.refresh_from_db()
        assert item_doacao.quantidade_recebida == 10
        assert item_doacao.quantidade_prometida == 10


@pytest.mark.django_db
class TestRF13ConfirmarRecebimento:
    """RF13 — Confirmar recebimento (admin)."""

    def test_admin_confirma_doacao(self, api_client, admin_client, usuario_autenticado, item_doacao):
        api_client.force_authenticate(user=usuario_autenticado)
        doacao_resp = api_client.post(
            '/api/doacoes/',
            {'item': item_doacao.id, 'quantidade': 3},
            format='json',
        )
        response = admin_client.post(f'/api/doacoes/{doacao_resp.data["id"]}/confirmar/')
        assert response.status_code == status.HTTP_200_OK
        assert response.data['status'] == Doacao.Status.RECEBIDA

    def test_confirmar_duplicado_retorna_erro(self, api_client, admin_client, usuario_autenticado, item_doacao):
        api_client.force_authenticate(user=usuario_autenticado)
        doacao_resp = api_client.post(
            '/api/doacoes/',
            {'item': item_doacao.id, 'quantidade': 3},
            format='json',
        )
        admin_client.post(f'/api/doacoes/{doacao_resp.data["id"]}/confirmar/')
        response = admin_client.post(f'/api/doacoes/{doacao_resp.data["id"]}/confirmar/')
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_usuario_comum_nao_confirma(self, api_client, usuario_autenticado, item_doacao):
        api_client.force_authenticate(user=usuario_autenticado)
        doacao_resp = api_client.post(
            '/api/doacoes/',
            {'item': item_doacao.id, 'quantidade': 3},
            format='json',
        )
        response = api_client.post(f'/api/doacoes/{doacao_resp.data["id"]}/confirmar/')
        assert response.status_code == status.HTTP_403_FORBIDDEN


@pytest.mark.django_db
class TestItensDoacao:
    def test_listar_itens_por_evento(self, api_client, item_doacao, evento_criado):
        response = api_client.get(f'/api/itens-doacao/?evento={evento_criado.id}')
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1
        assert response.data[0]['nome'] == item_doacao.nome

    def test_admin_cria_item(self, admin_client, evento_criado):
        response = admin_client.post(
            '/api/itens-doacao/',
            {'evento': evento_criado.id, 'nome': 'Feijão', 'meta_item': 50},
            format='json',
        )
        assert response.status_code == status.HTTP_201_CREATED
        assert ItemDoacao.objects.filter(nome='Feijão').exists()
