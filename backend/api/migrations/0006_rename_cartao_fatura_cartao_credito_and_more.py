# Generated by Django 5.1.1 on 2024-11-22 14:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_contabanco_saldo_inicial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='fatura',
            old_name='cartao',
            new_name='cartao_credito',
        ),
        migrations.RenameField(
            model_name='fatura',
            old_name='fata_fechamento',
            new_name='data_fechamento',
        ),
        migrations.RenameField(
            model_name='fatura',
            old_name='fata_vencimento',
            new_name='data_vencimento',
        ),
    ]
