from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import CartaoCredito, Fatura, Transacao
from dateutil.relativedelta import relativedelta
from datetime import date
import datetime

@receiver(post_save, sender=CartaoCredito)
def criar_fatura_inicial(sender, instance, created, **kwargs):
    if created:
        data_fechamento = date.today().replace(day=instance.data_fechamento)
        data_vencimento = data_fechamento.replace(day=instance.data_vencimento)

        Fatura.objects.create(
            cartao_credito=instance,
            data_fechamento=instance.data_fechamento,
            data_vencimento=instance.data_vencimento,
        )

@receiver(post_save, sender=Transacao)
def criar_fatura_se_necessario(sender, instance, created, **kwargs):
    if created and instance.tipo_transacao == "credito" and instance.cartao_credito:
        cartao=instance.cartao_credito
        dia_fechamento=cartao.data_fechamento
        hoje = datetime.date.today()

        if hoje.day > dia_fechamento:
            data_fechamento_atual = hoje.replace(day=dia_fechamento) + relativedelta(months=1)
        else:
            data_fechamento_atual = hoje.replace(day=dia_fechamento)
        data_vencimento = data_fechamento_atual.replace(day=cartao.data_vencimento)

        data_vencimento = data_fechamento_atual.replace(day=cartao.data_vencimento)

        fatura, created = Fatura.objects.get_or_create(
            cartao=cartao,
            data_fechament=data_fechamento_atual,
            defaults={"data_vencimento": data_vencimento}
        )

        instance.fatura = fatura
        instance.save()

@receiver(post_save, sender=Transacao)
def criar_parcelas(sender, instance, created, **kwargs):
    if created and instance.tipo_transacao == "credito" and instance.numero_parcelas > 1:
        for parcela_numero in range(1, instance.numero_parcelas + 1):
            data_parcela = instance.data + relativedelta(months=parcela_numero - 1)
            Transacao.objects.create(
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

