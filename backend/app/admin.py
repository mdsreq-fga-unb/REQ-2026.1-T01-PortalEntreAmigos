from django.contrib import admin
from .models import Evento, ItemDoacao, Doacao

# Register your models here.

admin.site.register(Evento)
admin.site.register(ItemDoacao)
admin.site.register(Doacao)