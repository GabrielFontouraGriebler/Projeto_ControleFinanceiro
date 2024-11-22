# Generated by Django 5.1.1 on 2024-11-20 00:06

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_categoria_tipo_categoria_cartaocredito_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Fatura',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('criado_em', models.DateTimeField(auto_now_add=True)),
                ('atualizado_em', models.DateField(auto_now=True)),
                ('fata_fechamento', models.DateField()),
                ('fata_vencimento', models.DateField()),
                ('paga', models.BooleanField(default=False)),
                ('cartao', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='faturas', to='api.cartaocredito')),
                ('usuario_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Transacao',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('criado_em', models.DateTimeField(auto_now_add=True)),
                ('atualizado_em', models.DateField(auto_now=True)),
                ('tipo_transacao', models.CharField(choices=[('debito', 'Débito'), ('credito', 'Crédito')], max_length=50)),
                ('valor', models.DecimalField(decimal_places=2, max_digits=10)),
                ('data', models.DateField(blank=True, null=True)),
                ('numero_parcelas', models.PositiveIntegerField(default=1)),
                ('valor_parcela', models.DecimalField(decimal_places=2, editable=False, max_digits=10)),
                ('descricao', models.CharField(max_length=255)),
                ('cartao_credito', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.cartaocredito')),
                ('categoria', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.categoria')),
                ('conta', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.contabanco')),
                ('fatura', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='transacoes', to='api.fatura')),
                ('parcela_origem', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='parcelas', to='api.transacao')),
                ('subcategoria', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.subcategoria')),
                ('usuario_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]