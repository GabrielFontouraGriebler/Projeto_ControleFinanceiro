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
    class Meta:
        model = CartaoCredito
        fields = [
            "id", "nome_cartao", "limite_credito", "limite_utilizado",
            "data_fechamento", "data_vencimento", "bandeira", "conta",
            "usuario_id"
        ]
        extra_kwargs = {
            "usuario_id": {"read_only": True},
            
        }

class FaturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fatura
        fields = [
            "id", "cartao", "data_fechamento", "data_vencimento", "paga"
        ]
        extra_kwargs = {
            "cartao": {"read_only": True}
        }

class TransacaoSerializer(serializers.ModelSerializer):
    valor_parcela = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    parcela_origem = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Transacao
        fields = [
            "id", "tipo_transacao", "valor", "data", "categoria", "subcategoria", "conta",
            "cartao_credito", "fatura", "numero_parcelas", "valor_parcela", "descricao",
            "usuario_id", "parcela_origem" 
        ]
        extra_kwargs = {
            "usuario_id": {"read_only": True},
            "fatura" : {"read_only": True},
            "cartao_credito": {"required": False, "allow_null": True}
        }