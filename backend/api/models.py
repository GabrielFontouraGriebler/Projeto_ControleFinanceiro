from django.db import models
from django.contrib.auth.models import User
from dateutil.relativedelta import relativedelta
import datetime

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
    saldo_inicial = models.DecimalField(max_digits=10, decimal_places=2)
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
    
class MetodoPagamento(ControleUsuarioModel):
    TIPO_PAGAMENTO = {
        "debito": "Débito",
        "credito": "crédito",
        "pix": "PIX",
        "boleto": "Boleto"
    }
    nome = models.CharField(max_length=100, choices=TIPO_PAGAMENTO)

class CartaoCredito(ControleUsuarioModel):
    TIPO_BANDEIRA = {
        "visa": "Visa",
        "mastercard": "Mastercard",
        "hipercard": "Hipercard",
        "elo": "Elo",
        "outra_bandeira": "Outra Bandeira"
    }
    nome_cartao = models.CharField(max_length=100)
    limite_credito = models.DecimalField(max_digits=10, decimal_places=2)
    limite_utilizado = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    data_fechamento = models.PositiveIntegerField()
    data_vencimento = models.PositiveIntegerField()
    bandeira = models.CharField(max_length=100, choices=TIPO_BANDEIRA)
    conta = models.ForeignKey(ContaBanco, on_delete=models.CASCADE, related_name="cartao")

    def perform_create(self, serializer):
        print("Dados recebidos:", serializer.validated_data)  # Adicione esta linha para verificar os dados
        serializer.save(usuario_id=self.request.user)

    # def obter_fatura_atual(self):
    #     hoje = datetime.date.today()
    #     dia_fechamento = self.data_fechamento

    #     data_fechamento_atual = hoje.replace(day=dia_fechamento)
    #     if hoje.day > dia_fechamento:
    #         data_fechamento_atual = data_fechamento_atual + relativedelta(months=1)
    #     data_vencimento = data_fechamento_atual.replace(day=self.data_vencimento)
    #     fatura, created = Fatura.objects.get_or_create(
    #         cartao=self,
    #         data_fechamento=data_fechamento_atual,
    #         defaults={"data_vencimento": data_vencimento}
    #     )

    #     return fatura
    
class Fatura(ControleUsuarioModel):
    cartao_credito = models.ForeignKey(CartaoCredito, on_delete=models.CASCADE, related_name="faturas")
    data_fechamento = models.DateField()
    data_vencimento = models.DateField()
    paga = models.BooleanField(default=False)

    def calcular_total(self):
        return sum(transacao.valor for transacao in self.transacao.all())
        
    def __str__(self):
        return f'Fatura de {self.cartao_credito.nome_cartao} - Fechamento: {self.data_fechamento}'
        
class Transacao(ControleUsuarioModel):
    tipo_transacao = models.CharField(max_length=50, choices=[
        ("debito", "Débito"),
        ("credito", "Crédito")
    ])
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    data = models.DateField(blank=True, null=True)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    subcategoria = models.ForeignKey(Subcategoria, on_delete=models.CASCADE, null=True, blank=True)
    conta = models.ForeignKey(ContaBanco, on_delete=models.CASCADE)
    cartao_credito = models.ForeignKey(CartaoCredito, on_delete=models.CASCADE, null=True, blank=True)
    fatura = models.ForeignKey(Fatura, on_delete=models.SET_NULL, null=True, blank=True, related_name="transacoes")
    numero_parcelas = models.PositiveIntegerField(default=1)
    valor_parcela = models.DecimalField(max_digits=10, decimal_places=2, editable=False)
    descricao = models.CharField(max_length=255)
    parcela_origem = models.ForeignKey("self", on_delete=models.CASCADE, null=True, blank=True, related_name="parcelas")

    def __str__(self):
        return f'{self.descricao} - {self.valor}'
        
    def save(self, *args, **kwargs):
        if self.parcela_origem:
            super(Transacao, self).save(*args, **kwargs)
            return
        if self.numero_parcelas and self.numero_parcelas > 1:
            self.valor_parcela = self.valor / self.numero_parcelas
        else:
            self.valor_parcela = self.valor
        super(Transacao, self).save(*args, **kwargs)

    # def criar_parcelas(self):
    #     for parcela_numero in range(1, self.numero_parcelas + 1):
    #         data_parcela = self.data + relativedelta(months=parcela_numero - 1)
    #         Transacao.objects.create(
    #             tipo_transacao=self.tipo_transacao,
    #             valor=self.valor_parcela,
    #             data=data_parcela,
    #             categoria=self.categoria,
    #             subcategoria=self.subcategoria,
    #             conta=self.conta,
    #             cartao_credito=self.cartao_credito,
    #             fatura=self.fatura, 
    #             numero_parcelas=1, 
    #             valor_parcela=self.valor_parcela,
    #             descricao=f'{self.descricao} - Parcela {parcela_numero}/{self.numero_parcelas}',
    #             usuario_id=self.usuario_id,
    #             parcela_origem=self
    #         )
    

