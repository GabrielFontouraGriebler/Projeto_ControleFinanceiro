from django.contrib.auth.models import User
from rest_framework import serializers
from .models import ContaBanco, Categoria, Subcategoria, CartaoCredito, Fatura, Transacao

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs =  {"password": {"write_only": True}}

    def create(self, validate_data):
        user = User.objects.create_user(**validate_data)
        return user
    
class BancoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContaBanco
        fields = ["id","nome","tipo_conta","saldo_inicial","data_criacao","usuario_id"]
        extra_kwargs = {"usuario_id": {"read_only": True}}

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ["id", "nome", "tipo_categoria"]

class SubcategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subcategoria
        fields = ["id", "nome", "categoria_id"]
        extra_kwargs = {"categoria_id": {"read_only": True}}

class CartaoCreditoSerializer(serializers.ModelSerializer):
    conta_nome = serializers.CharField(source='conta.nome', read_only=True)

    class Meta:
        model = CartaoCredito
        fields = [
            "id", "nome_cartao", "limite_credito", "limite_utilizado",
            "data_fechamento", "data_vencimento", "bandeira", "conta",
            "usuario_id", "conta_nome"
        ]
        extra_kwargs = {
            "usuario_id": {"read_only": True},
            
        }

class FaturaSerializer(serializers.ModelSerializer):
    valor_total = serializers.SerializerMethodField()

    class Meta:
        model = Fatura  
        fields = [
            "id", "cartao_credito", "data_fechamento", "data_vencimento", "paga", "valor_total"
        ]
        extra_kwargs = {
            "cartao": {"read_only": True}
        }

    def get_valor_total(self, obj):
        # Chama o método `calcular_total` para obter o valor total das transações da fatura
        return obj.calcular_total()

class TransacaoSerializer(serializers.ModelSerializer):
    valor_parcela = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    parcela_origem = serializers.PrimaryKeyRelatedField(read_only=True)
    categoria_selecionada = serializers.CharField(source='categoria.nome', read_only=True)
    subcategoria_selecionada = serializers.CharField(source='subcategoria.nome', read_only=True)
    conta_selecionada = serializers.CharField(source='conta.nome', read_only=True)


    class Meta:
        model = Transacao
        fields = [
            "id", "tipo_transacao", "valor", "data", "categoria", "subcategoria", "conta",
            "cartao_credito", "fatura", "numero_parcelas", "valor_parcela", "descricao",
            "usuario_id", "parcela_origem","tipo_financeiro", "categoria_selecionada", "subcategoria_selecionada",
            "conta_selecionada"
        ]
        extra_kwargs = {
            "usuario_id": {"read_only": True},
            "fatura" : {"read_only": True},
            "cartao_credito": {"required": False, "allow_null": True}
        }

class GraficoTransacaoSerializer(serializers.Serializer):
    mes = serializers.DateField(format="%Y-%m")  # Para formatar a data no formato "YYYY-MM"
    total = serializers.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        fields = ['mes', 'total']