from celery import shared_task
from dateutil.relativedelta import relativedelta
from .models import CartaoCredito, Fatura
import datetime

@shared_task
def gerar_faturas_mensais():
    hoje = datetime.date.today()
    cartoes = CartaoCredito.objects.all()

    for cartao in cartoes:
        dia_fechamento = cartao.data_fechamento
        data_fechamento_atual = hoje.replace(day=dia_fechamento)

        if hoje.day > dia_fechamento:
            data_fechamento_atual += relativedelta(months=1)

        fatura_existente = Fatura.objects.filter(
            cartao=cartao,
            data_fechamento=data_fechamento_atual
        ).exists()

        if not fatura_existente:
            data_vencimento = data_fechamento_atual.replace(day=cartao.data_vencimento)
            Fatura.objects.create(
                cartao=cartao,
                data_fechamento=data_fechamento_atual,
                data_vencimento=data_vencimento
            )