from django.db import models
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.contrib.auth.models import User


# Create your models here.

class Evento(models.Model):

    class Status(models.TextChoices):
        EM_ANDAMENTO = 'EM_ANDAMENTO', 'Em andamento'
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


@receiver(post_save, sender=User)
def criar_perfil_usuario(sender, instance, created, **kwargs):
    if created:
        PerfilUsuario.objects.create(user=instance)


@receiver(post_save, sender=User)
def salvar_perfil_usuario(sender, instance, **kwargs):
    if not hasattr(instance, 'perfil'):
        PerfilUsuario.objects.create(user=instance)
    else:
        instance.perfil.save()
