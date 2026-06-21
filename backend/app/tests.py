import pytest
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth import get_user_model

User = get_user_model()

# ==========================================
# FIXTURES (Preparação de dados e ferramentas)
# ==========================================

@pytest.fixture
def client():
    """Fornece o cliente de testes da API para todas as funções que pedirem."""
    return APIClient()

@pytest.fixture
def dados_usuario():
    """Fornece os dados padrão do usuário para os testes."""
    return {
        'username': 'testador@admin.com',
        'email': 'testador@admin.com',
        'password': 'SenhaForte123!',
    }

@pytest.fixture
def dados_registro(dados_usuario):
    return {
        'nome_completo': 'Testador',
        'email': dados_usuario['email'],
        'password': dados_usuario['password'],
        'confirmacao_senha': dados_usuario['password'],
        'cpf': '94806608815',
        'telefone': '61999999999',
    }


# A linha abaixo avisa ao Pytest que todos os testes deste arquivo precisam acessar o banco de dados
pytestmark = pytest.mark.django_db

# ==========================================
# TESTES
# ==========================================

def test_cadastro_usuario_com_sucesso(client, dados_registro):
    url = '/api/cadastro/'
    
    # Adicionamos format='json' para simular exatamente como o React envia
    response = client.post(url, dados_registro, format='json')
    
    # Se falhar, o Pytest vai capturar e exibir esse print no terminal
    if response.status_code != status.HTTP_201_CREATED:
        print("\nMOTIVO DA FALHA NO CADASTRO:", response.data)
        
    assert response.status_code == status.HTTP_201_CREATED

def test_cadastro_usuario_cpf_invalido_falha(client, dados_registro):
    url = '/api/cadastro/'
    dados_registro['cpf'] = '11111111111'
    response = client.post(url, dados_registro, format='json')
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert 'cpf' in response.data

def test_cadastro_usuario_cpf_duplicado_falha(client, dados_registro):
    url = '/api/cadastro/'
    response = client.post(url, dados_registro, format='json')
    assert response.status_code == status.HTTP_201_CREATED
    
    dados_registro['email'] = 'outro@admin.com'
    response = client.post(url, dados_registro, format='json')
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert 'cpf' in response.data

def test_cadastro_usuario_telefone_invalido_falha(client, dados_registro):
    url = '/api/cadastro/'
    dados_registro['telefone'] = '123'
    response = client.post(url, dados_registro, format='json')
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert 'telefone' in response.data

def test_login_retorna_token_jwt(client, dados_usuario):
    url = '/api/login/'

    User.objects.create_user(
        username=dados_usuario['email'],
        email=dados_usuario['email'],
        password=dados_usuario['password'],
    )

    response = client.post(url, {
        'email': dados_usuario['email'],
        'password': dados_usuario['password']
    }, format='json')
    
    if response.status_code != status.HTTP_200_OK:
        print("\nMOTIVO DA FALHA NO LOGIN:", response.data)
        
    assert response.status_code == status.HTTP_200_OK

def test_login_com_senha_incorreta_falha(client, dados_usuario):
    url = '/api/login/'
    User.objects.create_user(
        username=dados_usuario['email'],
        email=dados_usuario['email'],
        password=dados_usuario['password'],
    )

    response = client.post(url, {
        'email': dados_usuario['email'],
        'password': 'senha_errada'
    }, format='json')
    
    assert response.status_code == status.HTTP_401_UNAUTHORIZED

def test_perfil_usuario_get_sucesso(client, dados_usuario):
    url = '/api/perfil/'
    user = User.objects.create_user(
        username=dados_usuario['email'],
        email=dados_usuario['email'],
        password=dados_usuario['password'],
        first_name='Testador'
    )
    
    from app.models import PerfilUsuario
    perfil, created = PerfilUsuario.objects.get_or_create(user=user)
    perfil.cpf = '94806608815'
    perfil.telefone = '61999999999'
    perfil.save()
    
    response = client.get(url)
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    
    user = User.objects.get(id=user.id)
    client.force_authenticate(user=user)
    response = client.get(url)
    assert response.status_code == status.HTTP_200_OK
    assert response.data['nome'] == 'Testador'
    assert response.data['cpf'] == '94806608815'
    assert response.data['telefone'] == '61999999999'

def test_perfil_usuario_put_sucesso(client, dados_usuario):
    url = '/api/perfil/'
    user = User.objects.create_user(
        username=dados_usuario['email'],
        email=dados_usuario['email'],
        password=dados_usuario['password'],
        first_name='Testador'
    )
    
    client.force_authenticate(user=user)
    
    response = client.put(url, {
        'nome': 'Testador Editado',
        'email': 'testadoreditado@admin.com',
        'cpf': '94806608815',
        'telefone': '61888888888'
    }, format='json')
    
    assert response.status_code == status.HTTP_200_OK
    assert response.data['nome'] == 'Testador Editado'
    assert response.data['email'] == 'testadoreditado@admin.com'
    assert response.data['cpf'] == '94806608815'
    assert response.data['telefone'] == '61888888888'
    
    user.refresh_from_db()
    assert user.first_name == 'Testador Editado'
    assert user.perfil.cpf == '94806608815'
    assert user.perfil.telefone == '61888888888'