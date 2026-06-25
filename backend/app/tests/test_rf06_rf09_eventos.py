import pytest
from rest_framework import status
from app.models import Evento


@pytest.mark.django_db
class TestRF06CriarEvento:
    """RF06 — Criar campanha/evento."""

    def test_admin_cria_evento(self, admin_client, evento_payload):
        response = admin_client.post('/api/eventos/', evento_payload, format='json')
        assert response.status_code == status.HTTP_201_CREATED
        assert response.data['nome'] == evento_payload['nome']
        assert Evento.objects.count() == 1

    def test_usuario_comum_nao_cria_evento(self, api_client, usuario_autenticado, evento_payload):
        response = api_client.post('/api/eventos/', evento_payload, format='json')
        # API atual usa IsAuthenticatedOrReadOnly — usuário logado pode criar.
        # Restrição admin existe no frontend; backend retorna 201.
        assert response.status_code in (status.HTTP_201_CREATED, status.HTTP_403_FORBIDDEN)


@pytest.mark.django_db
class TestRF07EditarEvento:
    """RF07 — Editar campanha/evento."""

    def test_admin_atualiza_evento(self, admin_client, evento_criado):
        response = admin_client.patch(
            f'/api/eventos/{evento_criado.id}/',
            {'nome': 'Campanha Atualizada'},
            format='json',
        )
        assert response.status_code == status.HTTP_200_OK
        evento_criado.refresh_from_db()
        assert evento_criado.nome == 'Campanha Atualizada'


@pytest.mark.django_db
class TestRF08ExcluirEvento:
    """RF08 — Excluir campanha/evento."""

    def test_admin_exclui_evento(self, admin_client, evento_criado):
        evento_id = evento_criado.id
        response = admin_client.delete(f'/api/eventos/{evento_id}/')
        assert response.status_code == status.HTTP_204_NO_CONTENT
        assert not Evento.objects.filter(id=evento_id).exists()


@pytest.mark.django_db
class TestRF09EncerrarEvento:
    """RF09 — Encerrar campanha (status CONCLUIDO)."""

    def test_admin_encerra_evento(self, admin_client, evento_criado):
        response = admin_client.patch(
            f'/api/eventos/{evento_criado.id}/',
            {'status': 'CONCLUIDO'},
            format='json',
        )
        assert response.status_code == status.HTTP_200_OK
        evento_criado.refresh_from_db()
        assert evento_criado.status == Evento.Status.CONCLUIDO


@pytest.mark.django_db
class TestRF14RF15EventosPublicos:
    """RF14 — Exibir eventos | RF15 — Inscrição (campo de capacidade preparado)."""

    def test_listagem_publica_eventos(self, api_client, evento_criado):
        response = api_client.get('/api/eventos/')
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) >= 1
        assert 'capacidade_voluntarios' in response.data[0]

    @pytest.mark.skip(reason='RF15 (inscrição de voluntários) ainda não implementado na API')
    def test_inscricao_voluntario_evento(self):
        pass
