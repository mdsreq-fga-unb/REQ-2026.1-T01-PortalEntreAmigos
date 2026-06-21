from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
import re
from .models import Evento, ItemDoacao, Doacao, PerfilUsuario

def is_valid_cpf(cpf: str) -> bool:
    # Remove caracteres não numéricos
    cpf = ''.join(filter(str.isdigit, cpf))
    
    if len(cpf) != 11:
        return False
        
    # CPF não pode ter todos os dígitos iguais
    if cpf == cpf[0] * 11:
        return False
        
    # Calcula primeiro dígito verificador
    soma = sum(int(cpf[i]) * (10 - i) for i in range(9))
    resto = (soma * 10) % 11
    digito_1 = 0 if resto in (10, 11) else resto
    
    if int(cpf[9]) != digito_1:
        return False
        
    # Calcula segundo dígito verificador
    soma = sum(int(cpf[i]) * (11 - i) for i in range(10))
    resto = (soma * 10) % 11
    digito_2 = 0 if resto in (10, 11) else resto
    
    if int(cpf[10]) != digito_2:
        return False
        
    return True

class RegistroSerializer(serializers.ModelSerializer):
    # CA-US01-01: Campos obrigatórios
    nome_completo = serializers.CharField(required=True, source='first_name')
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True)
    confirmacao_senha = serializers.CharField(write_only=True, required=True)
    cpf = serializers.CharField(required=True, write_only=True)
    telefone = serializers.CharField(required=True, write_only=True)

    class Meta:
        model = User
        fields = ('nome_completo', 'email', 'password', 'confirmacao_senha', 'cpf', 'telefone')

    # CA-US01-02: O sistema não deve permitir o cadastro de um e-mail já existente
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Este e-mail já está cadastrado em nossa base de dados.")
        return value

    def validate_cpf(self, value):
        cpf_limpo = ''.join(filter(str.isdigit, value))
        if not is_valid_cpf(cpf_limpo):
            raise serializers.ValidationError("CPF inválido.")
        if PerfilUsuario.objects.filter(cpf=cpf_limpo).exists():
            raise serializers.ValidationError("Este CPF já está cadastrado em nossa base de dados.")
        return cpf_limpo

    def validate_telefone(self, value):
        telefone_limpo = ''.join(filter(str.isdigit, value))
        if len(telefone_limpo) not in (10, 11):
            raise serializers.ValidationError("O telefone deve ter 10 ou 11 dígitos (incluindo DDD).")
        return telefone_limpo

    # CA-US01-03: Validação da força da senha
    def validate(self, data):
        if data['password'] != data['confirmacao_senha']:
            raise serializers.ValidationError({"password": "As senhas não coincidem."})
        
        senha = data['password']
        if len(senha) < 8:
            raise serializers.ValidationError({"password": "A senha deve ter no mínimo 8 caracteres."})
        if not re.search(r'[A-Z]', senha):
            raise serializers.ValidationError({"password": "A senha deve conter pelo menos uma letra maiúscula."})
        if not re.search(r'\d', senha):
            raise serializers.ValidationError({"password": "A senha deve conter pelo menos um número."})
        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', senha):
            raise serializers.ValidationError({"password": "A senha deve conter pelo menos um caractere especial."})

        return data

    def create(self, validated_data):
        cpf = validated_data.pop('cpf')
        telefone = validated_data.pop('telefone')
        validated_data.pop('confirmacao_senha', None)

        # CA-US01-04: O método create_user do Django automaticamente aplica o hash na senha
        user = User.objects.create_user(
            username=validated_data['email'], # No Django padrão, o username é obrigatório, usaremos o e-mail
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name']
        )
        
        # PerfilUsuario é criado via signal, apenas atualizamos CPF e Telefone
        perfil, created = PerfilUsuario.objects.get_or_create(user=user)
        perfil.cpf = cpf
        perfil.telefone = telefone
        perfil.save()
        
        return user



class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')
        
        # Tenta achar o usuário pelo e-mail primeiro para descobrir o username real dele
        user_obj = User.objects.filter(email=email).first()
        
        if user_obj:
            user = authenticate(username=user_obj.username, password=password)
        else:
            # Fallback caso dê algum erro bizarro
            user = authenticate(username=email, password=password)
            
        if not user:
            raise AuthenticationFailed('E-mail ou senha incorretos.')
        data['user'] = user
        return data
    
    
class EventoSerializer(serializers.ModelSerializer):
    progresso_geral = serializers.FloatField(read_only=True)
    progresso_recebido = serializers.FloatField(read_only=True)

    class Meta:
        model = Evento
        #colunas que ficam visíveis na api
        fields = ['id', 'nome', 'descricao', 'data_inicio', 'data_fim', 'criado_em', 'local', 'capacidade_voluntarios', 'status', 'progresso_geral', 'progresso_recebido', 'pontos_coleta']

        read_only_fields = ['criado_em']
        extra_kwargs = {
            'local': {'required': False, 'allow_blank': True}
        }

    def validate(self, data):  # validação de datas e unicidade de campanha ativa
        data_inicio = data.get('data_inicio', getattr(self.instance, 'data_inicio', None))
        data_fim = data.get('data_fim', getattr(self.instance, 'data_fim', None))
        
        if data_inicio and data_fim and data_fim < data_inicio:
            raise serializers.ValidationError("A data de fim não pode ser anterior à data de início.")
        
        # Se a campanha que está sendo criada/atualizada está marcada como EM_ANDAMENTO
        status_val = data.get('status', getattr(self.instance, 'status', 'EM_ANDAMENTO'))
        if status_val == 'EM_ANDAMENTO':
            # Busca se já existe outra campanha em andamento
            campanhas_ativas = Evento.objects.filter(status='EM_ANDAMENTO')
            
            # Se for uma atualização (self.instance existe), ignora a própria campanha
            if self.instance:
                campanhas_ativas = campanhas_ativas.exclude(id=self.instance.id)
                
            if campanhas_ativas.exists():
                raise serializers.ValidationError("Já existe uma campanha ativa em andamento. Encerre a campanha atual antes de iniciar uma nova.")
                
        return data
        
class ItemDoacaoSerializer(serializers.ModelSerializer):
    progresso = serializers.FloatField(read_only=True)
    progresso_recebido = serializers.FloatField(read_only=True)

    class Meta:
        model = ItemDoacao
        fields = ['id', 'nome', 'meta_item', 'evento', 'quantidade_prometida', 'quantidade_recebida', 'progresso', 'progresso_recebido']
        read_only_fields = ['progresso', 'progresso_recebido']


class DoacaoSerializer(serializers.ModelSerializer):
    # Campos somente-leitura vindos do usuário relacionado
    doador_nome = serializers.CharField(source='usuario.first_name', read_only=True)
    doador_cpf = serializers.CharField(source='usuario.perfil.cpf', read_only=True)
    # Nome do item para exibição na tabela do admin
    item_nome = serializers.CharField(source='item.nome', read_only=True)
    # Nome da campanha/evento para exibir na aba "Minha Conta"
    evento_nome = serializers.CharField(source='item.evento.nome', read_only=True)

    class Meta:
        model = Doacao
        fields = ['id', 'item', 'item_nome', 'evento_nome', 'usuario', 'doador_nome', 'doador_cpf', 'quantidade', 'status', 'criado_em']
        read_only_fields = ['usuario', 'doador_nome', 'doador_cpf', 'item_nome', 'evento_nome', 'status', 'criado_em']