# Generated by Django 5.1.1 on 2024-11-20 20:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_fatura_transacao'),
    ]

    operations = [
        migrations.AlterField(
            model_name='contabanco',
            name='saldo_inicial',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
    ]
