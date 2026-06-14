from django.db import models

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
    local = models.CharField(max_length=100)
    capacidade_voluntarios = models.PositiveIntegerField()

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.EM_ANDAMENTO
    )

    @property #progresso da meta geral
    def progresso_geral(self):
        itens = self.itens_doacao.all()
        total_arrecadado = sum(item.quantidade_arrecadada for item in itens)  
        total_meta = sum(item.meta_item for item in itens)                    
        if total_meta == 0:
            return 0
        return round((total_arrecadado / total_meta) * 100, 2)

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
    quantidade_arrecadada = models.PositiveIntegerField(default=0) 
    
    @property #progresso da meta individual de cada item
    def progresso(self):
        if self.meta_item == 0:
            return 0

        return round((self.quantidade_arrecadada / self.meta_item) * 100, 2)
    
    def __str__(self):
        return f'{self.nome} ({self.evento.nome})'