from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
import re
from .models import Evento, ItemDoacao, Doacao

class RegistroSerializer(serializers.ModelSerializer):
    # CA-US01-01: Campos obrigatórios
    nome_completo = serializers.CharField(required=True, source='first_name')
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True)
    confirmacao_senha = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('nome_completo', 'email', 'password', 'confirmacao_senha')

    # CA-US01-02: O sistema não deve permitir o cadastro de um e-mail já existente
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Este e-mail já está cadastrado em nossa base de dados.")
        return value

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
        # CA-US01-04: O método create_user do Django automaticamente aplica o hash na senha
        user = User.objects.create_user(
            username=validated_data['email'], # No Django padrão, o username é obrigatório, usaremos o e-mail
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name']
        )
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True)

    def validate(self, data):
        user = authenticate(username=data['email'], password=data['password'])
        if not user:
            raise AuthenticationFailed('E-mail ou senha incorretos.')
        data['user'] = user
        return data
    
    
class EventoSerializer(serializers.ModelSerializer):
    progresso_geral = serializers.FloatField(read_only=True)
    
    class Meta:
        model = Evento
        #colunas que ficam visíveis na api
        fields = ['id', 'nome', 'descricao', 'data_inicio', 'data_fim', 'criado_em', 'local', 'capacidade_voluntarios', 'status', 'progresso_geral']
        read_only_fields = ['criado_em']
    
    def validate(self, data):  # validação de datas
        if data['data_fim'] < data['data_inicio']:
            raise serializers.ValidationError("A data de fim não pode ser anterior à data de início.")
        return data    
        
class ItemDoacaoSerializer(serializers.ModelSerializer):
    progresso = serializers.FloatField(read_only=True) 
    
    class Meta:
        model = ItemDoacao
        fields = ['id', 'nome', 'meta_item', 'evento', 'quantidade_arrecadada', 'progresso']
        read_only_fields = ['progresso']   
        
class DoacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doacao
        fields = ['id', 'item', 'doador_nome', 'doador_email', 'quantidade', 'criado_em']
        read_only_fields = ['criado_em']

    def create(self, validated_data):
        doacao = super().create(validated_data)
        doacao.item.atualizar_quantidade()  
        return doacao        