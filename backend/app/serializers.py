from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
import re
from .models import Evento, ItemDoacao, Doacao, PerfilUsuario, CodigoRecuperacaoSenha, CardTransparencia
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.db import transaction
from django.conf import settings
import threading

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


def validar_complexidade_senha(senha: str) -> str | None:
    """Valida os critérios de complexidade da senha.
    Retorna uma mensagem de erro ou None se a senha for válida."""
    if len(senha) < 8:
        return "A senha deve ter no mínimo 8 caracteres."
    if not re.search(r'[A-Z]', senha):
        return "A senha deve conter pelo menos uma letra maiúscula."
    if not re.search(r'\d', senha):
        return "A senha deve conter pelo menos um número."
    if not re.search(r'[!@#$%^&*(),.?":{}|<>]', senha):
        return "A senha deve conter pelo menos um caractere especial."
    return None

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
        
        erro = validar_complexidade_senha(data['password'])
        if erro:
            raise serializers.ValidationError({"password": erro})

        return data

    def create(self, validated_data):
        cpf = validated_data.pop('cpf')
        telefone = validated_data.pop('telefone')
        validated_data.pop('confirmacao_senha', None)

        with transaction.atomic():
            user = User.objects.create_user(
                username=validated_data['email'],
                email=validated_data['email'],
                password=validated_data['password'],
                first_name=validated_data['first_name'],
                is_active=False
            )
            perfil, created = PerfilUsuario.objects.get_or_create(user=user)
            perfil.cpf = cpf
            perfil.telefone = telefone
            perfil.save()

        url_ativacao = construir_link_confirmacao(user)
        corpo_email = (
            f"Olá {user.first_name},\n\n"
            f"Obrigado por se cadastrar no Portal Entre Amigos!\n\n"
            f"Por favor, clique no link abaixo para ativar a sua conta:\n"
            f"{url_ativacao}\n\n"
            f"Se você não solicitou este cadastro, apenas ignore este e-mail."
        )

        def enviar_email():
            try:
                send_mail(
                    subject='Bem-vindo ao Portal Entre Amigos! Confirme seu e-mail',
                    message=corpo_email,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[user.email],
                    fail_silently=False,
                )
                print(f"Email enviado com sucesso para {user.email}")
            except Exception as e:
                print(f"ERRO ao enviar email: {type(e).__name__}: {e}")

        thread = threading.Thread(target=enviar_email)
        thread.daemon = True
        thread.start()

        return user



class LoginSerializer(serializers.Serializer):
    # Aceita e-mail ou CPF no campo identificador
    email = serializers.CharField(required=True)
    password = serializers.CharField(write_only=True, required=True)

    def validate(self, data):
        identificador = data.get('email', '').strip()
        password = data.get('password')

        user_obj = None

        # Tenta primeiro localizar pelo e-mail
        user_obj = User.objects.filter(email__iexact=identificador).first()

        # Se não encontrou pelo e-mail, tenta pelo CPF
        if not user_obj:
            cpf_limpo = ''.join(filter(str.isdigit, identificador))
            if cpf_limpo:
                perfil = PerfilUsuario.objects.filter(cpf=cpf_limpo).select_related('user').first()
                if perfil:
                    user_obj = perfil.user

        if user_obj and user_obj.check_password(password) and not user_obj.is_active:
            raise AuthenticationFailed(
                'Sua conta ainda não foi ativada. Verifique o link de confirmação enviado para o seu e-mail.',
                code='conta_inativa'
            )

        if user_obj:
            user = authenticate(username=user_obj.username, password=password)
        else:
            user = None

        if not user:
            raise AuthenticationFailed('E-mail, CPF ou senha incorretos.')

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
        fields = ['id', 'nome', 'unidade_medida', 'meta_item', 'evento', 'quantidade_prometida', 'quantidade_recebida', 'progresso', 'progresso_recebido']
        read_only_fields = ['progresso', 'progresso_recebido']

    def validate_meta_item(self, value):
        if value <= 0:
            raise serializers.ValidationError("A meta de arrecadação do item deve ser maior que zero.")
        return value


class DoacaoSerializer(serializers.ModelSerializer):
    # Campos somente-leitura vindos do usuário relacionado
    doador_nome = serializers.CharField(source='usuario.first_name', read_only=True)
    doador_cpf = serializers.CharField(source='usuario.perfil.cpf', read_only=True)
    # Nome do item para exibição na tabela do admin
    item_nome = serializers.CharField(source='item.nome', read_only=True)
    # Nome da campanha/evento para exibir na aba "Minha Conta"
    evento_nome = serializers.CharField(source='item.evento.nome', read_only=True)
    evento_status = serializers.CharField(source='item.evento.status', read_only=True)
    evento_id = serializers.IntegerField(source='item.evento.id', read_only=True)

    class Meta:
        model = Doacao
        fields = ['id', 'item', 'item_nome', 'evento_nome', 'evento_status', 'evento_id', 'usuario', 'doador_nome', 'doador_cpf', 'quantidade', 'status', 'criado_em']
        read_only_fields = ['usuario', 'doador_nome', 'doador_cpf', 'item_nome', 'evento_nome', 'evento_status', 'evento_id', 'status', 'criado_em']
# Disparo de emails
def construir_link_confirmacao(utilizador):
    """
    Recebe um objeto de utilizador (User) recém-criado, gera os tokens de segurança
    e monta o link final que será enviado por e-mail.
    A URL base é lida de settings.FRONTEND_URL, permitindo configuração por ambiente
    sem alterar o código-fonte.
    """

    # Transformar a Chave Primária (ID) num formato seguro para URLs
    uid_seguro = urlsafe_base64_encode(force_bytes(utilizador.pk))

    # Gerar o token matemático único e temporário
    token_unico = default_token_generator.make_token(utilizador)

    # Construção do endereço direcionado ao Frontend (React)
    # settings.FRONTEND_URL é definido em core/settings.py e pode ser sobrescrito
    # por variável de ambiente para os diferentes ambientes (dev, staging, produção).
    url_frontend = f"{settings.FRONTEND_URL}/confirmar-email?uid={uid_seguro}&token={token_unico}"

    return url_frontend

class CardTransparenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = CardTransparencia
        fields = ['id', 'nome', 'arquivo_pdf', 'criado_em']