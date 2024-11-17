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

class ControleUsuarioModel(models.Model):
    usuario_id = models.ForeignKey(User, on_delete=models.CASCADE)
    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateField(auto_now=True)

    class Meta:
        abstract = True

class Categoria(ControleUsuarioModel):
    TIPO_CATEGORIA = {
        "despesa":"Despesa",
        "receita":"Receita"
    }
    nome = models.CharField(max_length=100)
    tipo_categoria = models.CharField(max_length=150, choices=TIPO_CATEGORIA)

    def __str__(self):
        return self.nome

class Subcategoria(ControleUsuarioModel):
    nome = models.CharField(max_length=100)
    categoria_id = models.ForeignKey(Categoria, on_delete=models.CASCADE, related_name="categorias")


    def __str__(self):
        return self.nome