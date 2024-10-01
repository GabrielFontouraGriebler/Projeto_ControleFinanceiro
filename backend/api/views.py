from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, BancoSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import ContaBanco


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
