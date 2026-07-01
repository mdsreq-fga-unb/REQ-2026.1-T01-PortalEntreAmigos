from django.db import models
from django.db.models.signals import post_save, post_delete, pre_save
from django.dispatch import receiver
from django.contrib.auth.models import User


# Create your models here.

class Evento(models.Model):

    class Status(models.TextChoices):
        EM_ANDAMENTO = 'EM_ANDAMENTO', 'Em andamento'
        AGUARDANDO_RELATORIO = 'AGUARDANDO_RELATORIO', 'Aguardando Relatório'
        CONCLUIDO = 'CONCLUIDO', 'Concluído'
        CANCELADO = 'CANCELADO', 'Cancelado'

    nome = models.CharField(max_length=100)
    descricao = models.TextField(max_length=250)
    data_inicio = models.DateField()
    data_fim = models.DateField()
    criado_em = models.DateTimeField(auto_now_add=True)
    local = models.CharField(max_length=100, blank=True, default='')
    capacidade_voluntarios = models.PositiveIntegerField()

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.EM_ANDAMENTO
    )

    pontos_coleta = models.JSONField(default=list, blank=True)

    @property  # progresso da meta geral com base em itens prometidos
    def progresso_geral(self):
        totais = self.itens_doacao.aggregate(
            total_prometido=models.Sum('quantidade_prometida'),
            total_meta=models.Sum('meta_item')
        )
        total_prometido = totais['total_prometido'] or 0
        total_meta = totais['total_meta'] or 0

        if total_meta == 0:
            return 0
        return round((total_prometido / total_meta) * 100, 2)

    @property  # progresso da meta geral com base em itens recebidos
    def progresso_recebido(self):
        totais = self.itens_doacao.aggregate(
            total_recebido=models.Sum('quantidade_recebida'),
            total_meta=models.Sum('meta_item')
        )
        total_recebido = totais['total_recebido'] or 0
        total_meta = totais['total_meta'] or 0

        if total_meta == 0:
            return 0
        return round((total_recebido / total_meta) * 100, 2)

    def __str__(self):
        return self.nome


class ItemDoacao(models.Model):
    evento = models.ForeignKey(
        Evento,
        on_delete=models.CASCADE,
        related_name='itens_doacao'
    )

    nome = models.CharField(max_length=100)
    unidade_medida = models.CharField(max_length=20, default='unidade')
    meta_item = models.PositiveIntegerField(default=1)
    # Total de unidades prometidas (todas as promessas, independente de status)
    quantidade_prometida = models.PositiveIntegerField(default=0)
    # Total de unidades efetivamente recebidas (apenas doações RECEBIDA)
    quantidade_recebida = models.PositiveIntegerField(default=0)

    def atualizar_quantidades(self):
        prometida = self.doacoes.aggregate(
            total=models.Sum('quantidade')
        )['total'] or 0
        recebida = self.doacoes.filter(status='RECEBIDA').aggregate(
            total=models.Sum('quantidade')
        )['total'] or 0
        self.quantidade_prometida = prometida
        self.quantidade_recebida = recebida
        self.save()

    @property  # progresso meta individual baseado em prometidos
    def progresso(self):
        if self.meta_item == 0:
            return 0
        return round((self.quantidade_prometida / self.meta_item) * 100, 2)

    @property  # progresso meta individual baseado em recebidos
    def progresso_recebido(self):
        if self.meta_item == 0:
            return 0
        return round((self.quantidade_recebida / self.meta_item) * 100, 2)

    def __str__(self):
        return f"{self.nome} ({self.evento.nome})"


class Doacao(models.Model):
    class Status(models.TextChoices):
        PENDENTE = 'PENDENTE', 'Pendente'
        RECEBIDA = 'RECEBIDA', 'Recebida'

    item = models.ForeignKey(
        ItemDoacao,
        on_delete=models.CASCADE,
        related_name='doacoes'
    )
    usuario = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='doacoes'
    )
    quantidade = models.PositiveIntegerField()
    status = models.CharField(
        max_length=10,
        choices=Status.choices,
        default=Status.PENDENTE
    )
    criado_em = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.usuario.first_name} → {self.item.nome} ({self.quantidade}) [{self.status}]'


@receiver(post_save, sender=Doacao)
@receiver(post_delete, sender=Doacao)
def atualizar_quantidade_item(sender, instance, **kwargs):
    instance.item.atualizar_quantidades()


class PerfilUsuario(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='perfil')
    cpf = models.CharField(max_length=11, unique=True, null=True, blank=True)
    telefone = models.CharField(max_length=15, null=True, blank=True)

    def __str__(self):
        return f"Perfil de {self.user.email}"


class CodigoRecuperacaoSenha(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='codigo_recuperacao')
    codigo = models.CharField(max_length=5)
    criado_em = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Código de recuperação de {self.user.email}"


@receiver(post_save, sender=User)
def criar_ou_salvar_perfil(sender, instance, created, **kwargs):
    if created:
        PerfilUsuario.objects.get_or_create(user=instance)
    elif hasattr(instance, 'perfil'):
        instance.perfil.save()


@receiver(post_save, sender=Evento)
def manter_limite_campanhas_encerradas(sender, instance, **kwargs):
    if instance.status == Evento.Status.CONCLUIDO:
        encerradas = Evento.objects.filter(status=Evento.Status.CONCLUIDO).order_by('-id')
        if encerradas.count() > 3:
            para_deletar = encerradas[3:]
            for camp in para_deletar:
                camp.delete()


class CardTransparencia(models.Model):
    nome = models.CharField(max_length=100)
    arquivo_pdf = models.FileField(upload_to='transparencia_pdfs/')
    criado_em = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nome

@receiver(post_delete, sender=CardTransparencia)
def deletar_pdf_ao_excluir_card(sender, instance, **kwargs):
    if instance.arquivo_pdf:
        instance.arquivo_pdf.delete(False)


@receiver(pre_save, sender=CardTransparencia)
def deletar_pdf_antigo_ao_atualizar(sender, instance, **kwargs):
    if not instance.pk:
        return
    try:
        old_file = CardTransparencia.objects.get(pk=instance.pk).arquivo_pdf
    except CardTransparencia.DoesNotExist:
        return
    new_file = instance.arquivo_pdf
    if not old_file == new_file:
        if old_file:
            old_file.delete(False)
