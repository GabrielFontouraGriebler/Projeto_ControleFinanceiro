from django.contrib.auth.models import User
from rest_framework import serializers
from .models import ContaBanco

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