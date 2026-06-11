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
    
    if response.status_code != status.HTTP_401_UNAUTHORIZED:
        print("\nMOTIVO DA FALHA NA SENHA INCORRETA:", response.data)
        
    assert response.status_code == status.HTTP_401_UNAUTHORIZED