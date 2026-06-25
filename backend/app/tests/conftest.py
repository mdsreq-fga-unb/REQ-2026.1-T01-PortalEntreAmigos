import pytest
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from app.models import Evento, ItemDoacao, PerfilUsuario


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def usuario_dados():
    return {
        'nome_completo': 'João da Silva',
        'email': 'joao@teste.com',
        'password': 'Senha@123',
        'confirmacao_senha': 'Senha@123',
        'cpf': '94806608815',
        'telefone': '61999999999',
    }


@pytest.fixture
def usuario_criado(db, usuario_dados):
    client = APIClient()
    client.post('/api/cadastro/', usuario_dados, format='json')
    return User.objects.get(email=usuario_dados['email'])


@pytest.fixture
def usuario_autenticado(api_client, usuario_criado):
    api_client.force_authenticate(user=usuario_criado)
    return usuario_criado


@pytest.fixture
def admin_user(db):
    user = User.objects.create_user(
        username='admin@teste.com',
        email='admin@teste.com',
        password='Admin@123',
        first_name='Admin',
        is_staff=True,
        is_superuser=True,
    )
    PerfilUsuario.objects.get_or_create(user=user, defaults={'cpf': '52998224725', 'telefone': '61988887777'})
    return user


@pytest.fixture
def admin_client(api_client, admin_user):
    api_client.force_authenticate(user=admin_user)
    return api_client


@pytest.fixture
def evento_payload():
    return {
        'nome': 'Campanha Arrecadação',
        'descricao': 'Arrecadação de alimentos para famílias.',
        'data_inicio': '2026-06-01',
        'data_fim': '2026-06-30',
        'local': 'Brasília-DF',
        'capacidade_voluntarios': 20,
        'status': 'EM_ANDAMENTO',
        'pontos_coleta': [],
    }


@pytest.fixture
def evento_criado(admin_client, evento_payload):
    response = admin_client.post('/api/eventos/', evento_payload, format='json')
    assert response.status_code == 201
    return Evento.objects.get(pk=response.data['id'])


@pytest.fixture
def item_doacao(evento_criado):
    return ItemDoacao.objects.create(
        evento=evento_criado,
        nome='Arroz 5kg',
        meta_item=100,
    )
