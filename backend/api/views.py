from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, BancoSerializer, CategoriaSerializer, SubcategoriaSerializer, TransacaoSerializer, FaturaSerializer, CartaoCreditoSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import ContaBanco, Categoria, Subcategoria, Transacao, Fatura, CartaoCredito
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
    serializer_class = SubcategoriaSerializer
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
    serializer_class = SubcategoriaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Subcategoria.objects.filter(usuario_id=user)
    
class DeletarSubcategoria(generics.DestroyAPIView):
    serializer_class = SubcategoriaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Subcategoria.objects.filter(usuario_id=user)
    
class ListarSubcategoriasPorCategoria(generics.ListAPIView):
    serializer_class = SubcategoriaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        categoria_id = self.kwargs.get("categoria_id")
        return Subcategoria.objects.filter(categoria_id=categoria_id).order_by("nome")
    
class CriarTransacao(generics.CreateAPIView):
    serializer_class = TransacaoSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        numero_parcelas = self.request.data.get("numero_parcelas", 1)
        try:
            numero_parcelas = int(numero_parcelas)
            if numero_parcelas < 1:
                raise ValidationError({"numero_parcelas": "O número de parcelas deve ser maior ou igual a 1."})
        except ValueError:
            raise ValidationError({"numero_parcelas": "O número de parcelas deve ser um valor inteiro válido."})
        
        serializer.save(usuario_id=self.request.user)

class ListarTransacao(generics.ListCreateAPIView):
    serializer_class = TransacaoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Transacao.objects.filter(usuario_id=user)
    
class DeletarTransacao(generics.DestroyAPIView):
    serializer_class = TransacaoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Transacao.objects.filter(usuario_id=user)
    
    def perform_destroy(self, instance):
        if instance.parcela_origem is None:
            instance.parcelas.all().delete()
        super().perform_destroy(instance)

class ListarFatura(generics.ListCreateAPIView):
    serializer_class = FaturaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        cartao_id = self.kwargs.get("cartao_id")
        return Fatura.objects.filter(cartao_credito_id = cartao_id).order_by('data_vencimento')

    
# class DeletarFatura(generics.DestroyAPIView):
#     serializer_class = FaturaSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         return Fatura.objects.filter(cartao_credito_usuario_id=self.request.user)

class CriarCartaoCredito(generics.CreateAPIView):
    serializer_class = CartaoCreditoSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(usuario_id=self.request.user)

class ListarCartaoCredito(generics.ListCreateAPIView):
    serializer_class = CartaoCreditoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return CartaoCredito.objects.filter(usuario_id=user)

class DeletarCartaoCredito(generics.DestroyAPIView):
    serializer_class = CartaoCreditoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return CartaoCredito.objects.filter(usuario_id=user)



