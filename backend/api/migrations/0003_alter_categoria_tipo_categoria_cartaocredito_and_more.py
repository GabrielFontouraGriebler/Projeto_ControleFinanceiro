# Generated by Django 5.1.1 on 2024-11-19 23:58

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_categoria_subcategoria'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name='categoria',
            name='tipo_categoria',
            field=models.CharField(choices=[('despesa', 'Despesa'), ('receita', 'Receita')], max_length=150),
        ),
        migrations.CreateModel(
            name='CartaoCredito',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('criado_em', models.DateTimeField(auto_now_add=True)),
                ('atualizado_em', models.DateField(auto_now=True)),
                ('nome_cartao', models.CharField(max_length=100)),
                ('limite_credito', models.DecimalField(decimal_places=2, max_digits=10)),
                ('limite_utilizado', models.DecimalField(decimal_places=2, default=0.0, max_digits=10)),
                ('data_fechamento', models.PositiveIntegerField()),
                ('data_vencimento', models.PositiveIntegerField()),
                ('bandeira', models.CharField(choices=[('visa', 'Visa'), ('mastercard', 'Mastercard'), ('hipercard', 'Hipercard'), ('elo', 'Elo'), ('outra_bandeira', 'Outra Bandeira')], max_length=100)),
                ('conta', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cartao', to='api.contabanco')),
                ('usuario_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='MetodoPagamento',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('criado_em', models.DateTimeField(auto_now_add=True)),
                ('atualizado_em', models.DateField(auto_now=True)),
                ('nome', models.CharField(choices=[('debito', 'Débito'), ('credito', 'crédito'), ('pix', 'PIX'), ('boleto', 'Boleto')], max_length=100)),
                ('usuario_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
