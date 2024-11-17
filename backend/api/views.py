from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, BancoSerializer, CategoriaSerializer, SubcategoriaSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import ContaBanco, Categoria, Subcategoria
from rest_framework.exceptions import ValidationError;


class ListaBancoCriado(generics.ListCreateAPIView):
    serializer_class = BancoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return ContaBanco.objects.filter(usuario_id=user)

class CreateBancoView(generics.CreateAPIView):
    serializer_class= BancoSerializer
    permission_classes= [IsAuthenticated]

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(usuario_id=self.request.user)
        else:
            print(serializer.erros)

class DeletaBanco(generics.DestroyAPIView):
    serializer_class = BancoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return ContaBanco.objects.filter(usuario_id=user)
    
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class CriarCategoriaView(generics.CreateAPIView):
    serializer_class = CategoriaSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(usuario_id=self.request.user)
        else:
            print(serializer.erros)

class ListarCategoria(generics.ListCreateAPIView):
    serializer_class = CategoriaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Categoria.objects.filter(usuario_id=user)
    
class DeletaCategoria(generics.DestroyAPIView):
    serializer_class = CategoriaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Categoria.objects.filter(usuario_id=user)
    
class CriarSubcategoria(generics.CreateAPIView):
    serializer_class = Subcategoria
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        categoria_id = self.request.data.get("categoria_id")

        if not categoria_id:
            raise ValidationError({"error": "o campo categoria_id é obrigatório."}) 
        try:
            categoria = Categoria.objects.get(id=categoria_id)
        except Categoria.DoesNotExist:
            raise ValidationError({"error": "Categoria não encontrada."})
        serializer.save(usuario_id=self.request.user, categoria_id=categoria)

class ListarSubcategoria(generics.ListCreateAPIView):
    serializer_class = Subcategoria
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Subcategoria.objects.filter(usuario_id=user)
    
class DeletarSubcategoria(generics.DestroyAPIView):
    serializer_class = Subcategoria
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Subcategoria.objects.filter(usuario_id=user)
    



