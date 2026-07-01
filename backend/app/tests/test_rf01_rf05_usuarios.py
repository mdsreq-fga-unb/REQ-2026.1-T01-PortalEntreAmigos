import pytest
from django.contrib.auth.models import User
from rest_framework import status


@pytest.mark.django_db
class TestRF01CadastroUsuario:
    """RF01 — Cadastro de usuário."""

    def test_cadastro_sucesso(self, api_client, usuario_dados):
        response = api_client.post('/api/cadastro/', usuario_dados, format='json')
        assert response.status_code == status.HTTP_201_CREATED
        assert User.objects.filter(email=usuario_dados['email']).exists()

    def test_cadastro_email_duplicado(self, api_client, usuario_dados):
        api_client.post('/api/cadastro/', usuario_dados, format='json')
        response = api_client.post('/api/cadastro/', usuario_dados, format='json')
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert 'email' in response.data

    def test_cadastro_senha_fraca(self, api_client, usuario_dados):
        dados = {**usuario_dados, 'password': 'fraca', 'confirmacao_senha': 'fraca'}
        response = api_client.post('/api/cadastro/', dados, format='json')
        assert response.status_code == status.HTTP_400_BAD_REQUEST


@pytest.mark.django_db
class TestRF02LoginUsuario:
    """RF02 — Login de usuário."""

    def test_login_sucesso(self, api_client, usuario_dados):
        api_client.post('/api/cadastro/', usuario_dados, format='json')
        user = User.objects.get(email=usuario_dados['email'])
        user.is_active = True
        user.save(update_fields=['is_active'])
        response = api_client.post(
            '/api/login/',
            {'email': usuario_dados['email'], 'password': usuario_dados['password']},
            format='json',
        )
        assert response.status_code == status.HTTP_200_OK
        assert 'access' in response.data
        assert response.data['role'] == 'USER'

    def test_login_credenciais_invalidas(self, api_client, usuario_dados):
        api_client.post('/api/cadastro/', usuario_dados, format='json')
        response = api_client.post(
            '/api/login/',
            {'email': usuario_dados['email'], 'password': 'SenhaErrada@1'},
            format='json',
        )
        assert response.status_code == status.HTTP_401_UNAUTHORIZED


@pytest.mark.django_db
class TestRF03RF04PerfilUsuario:
    """RF03 — Visualizar perfil | RF04 — Editar perfil."""

    def test_get_perfil_autenticado(self, api_client, usuario_autenticado):
        response = api_client.get('/api/perfil/')
        assert response.status_code == status.HTTP_200_OK
        assert response.data['email'] == usuario_autenticado.email

    def test_get_perfil_nao_autenticado(self, api_client):
        response = api_client.get('/api/perfil/')
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_put_perfil_atualiza_dados(self, api_client, usuario_autenticado):
        response = api_client.put(
            '/api/perfil/',
            {
                'nome': 'João Atualizado',
                'email': usuario_autenticado.email,
                'cpf': '94806608815',
                'telefone': '61988887777',
            },
            format='json',
        )
        assert response.status_code == status.HTTP_200_OK
        assert response.data['nome'] == 'João Atualizado'

    def test_put_perfil_nome_obrigatorio(self, api_client, usuario_autenticado):
        response = api_client.put(
            '/api/perfil/',
            {'nome': '', 'email': usuario_autenticado.email},
            format='json',
        )
        assert response.status_code == status.HTTP_400_BAD_REQUEST


@pytest.mark.django_db
class TestRF05ExclusaoConta:
    """RF05 — Exclusão de conta (validado no frontend; backend não expõe endpoint dedicado)."""

    def test_usuario_pode_ser_removido_diretamente(self, usuario_criado):
        user_id = usuario_criado.id
        usuario_criado.delete()
        assert not User.objects.filter(id=user_id).exists()
