from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class ContaBanco(models.Model):
    TIPO_CONTA = {
        "conta_corrente":"Conta Corrente",
        "carteira":"Carteira",
        "poupanca":"Poupança",
        "investimentos":"Investimentos",
        "outros":"Outros..."
    }
    nome = models.CharField(max_length=100)
    tipo_conta = models.CharField(max_length=30, choices=TIPO_CONTA)
    saldo_inicial = models.IntegerField(max_length=50)
    data_criacao = models.DateTimeField(auto_now_add=True)
    usuario_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="bancos")

    def __str__(self): 
        return self.nome
