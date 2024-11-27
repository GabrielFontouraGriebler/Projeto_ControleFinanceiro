from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import CartaoCredito, Fatura, Transacao
from dateutil.relativedelta import relativedelta
from datetime import date
import datetime

@receiver(post_save, sender=CartaoCredito)
def criar_fatura_inicial(sender, instance, created, **kwargs):
    if created:

        hoje = date.today()

        try:
            data_fechamento = hoje.replace(day=instance.data_fechamento)
        except ValueError:
            ultimo_dia_mes = (hoje.replace(day=1) + relativedelta(months=1) - relativedelta(days=1)).day
            data_fechamento = hoje.replace(day=min(instance.data_fechamento, ultimo_dia_mes))

        try:
            data_vencimento = data_fechamento.replace(day=instance.data_vencimento)
        except ValueError:
            ultimo_dia_mes = (data_fechamento.replace(day=1) + relativedelta(months=1) - relativedelta(days=1)).day
            data_vencimento = data_fechamento.replace(day=min(instance.data_vencimento, ultimo_dia_mes))

        Fatura.objects.create(
            cartao_credito=instance,
            data_fechamento=data_fechamento,
            data_vencimento=data_vencimento,
            usuario_id=instance.usuario_id
        )

@receiver(post_save, sender=Transacao)
def criar_fatura_se_necessario(sender, instance, created, **kwargs):
    if created and instance.tipo_transacao == "credito" and instance.cartao_credito:
        cartao=instance.cartao_credito
        dia_fechamento=cartao.data_fechamento
        hoje = datetime.date.today()

        numero_total_parcelas = instance.numero_parcelas if instance.numero_parcelas > 1 else 1
        for parcela_numero in range(1, numero_total_parcelas + 1):
            # Calcular a data de fechamento e vencimento para cada parcela
            data_parcela = instance.data + relativedelta(months=parcela_numero - 1)
            
            if data_parcela.day > dia_fechamento:
                data_fechamento_atual = data_parcela.replace(day=dia_fechamento) + relativedelta(months=1)
            else:
                data_fechamento_atual = data_parcela.replace(day=dia_fechamento)
                
            # Calcular data de vencimento com base no fechamento
            data_vencimento = data_fechamento_atual.replace(day=cartao.data_vencimento)

        fatura, created = Fatura.objects.get_or_create(
            cartao_credito=cartao,
            data_fechamento=data_fechamento_atual,
            defaults={
                "data_vencimento": data_vencimento,
                "usuario_id": instance.usuario_id
                }
        )
        if parcela_numero == 1:
            instance.fatura = fatura
            instance.save()

@receiver(post_save, sender=Transacao)
def criar_parcelas(sender, instance, created, **kwargs):
    if created and instance.tipo_transacao == "credito" and instance.tipo_financeiro == "despesa" and instance.numero_parcelas > 1 and not instance.parcela_origem:
        for parcela_numero in range(1, instance.numero_parcelas + 1):
            data_parcela = instance.data + relativedelta(months=parcela_numero - 1)
            Transacao.objects.create(
                tipo_financeiro=instance.tipo_financeiro,
                tipo_transacao=instance.tipo_transacao,
                valor=instance.valor_parcela,
                data=data_parcela,
                categoria=instance.categoria,
                subcategoria=instance.subcategoria,
                conta=instance.conta,
                cartao_credito=instance.cartao_credito,
                fatura=instance.fatura, 
                numero_parcelas=1, 
                valor_parcela=instance.valor_parcela,
                descricao=f'{instance.descricao} - Parcela {parcela_numero}/{instance.numero_parcelas}',
                usuario_id=instance.usuario_id,
                parcela_origem=instance
            )
        instance.numero_parcelas = 0
        instance.save()

    

