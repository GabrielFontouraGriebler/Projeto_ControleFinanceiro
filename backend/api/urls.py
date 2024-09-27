from django.urls import path
from . import views

urlpatterns = [
    path("bancos/", views.ListaBancoCriado.as_view(), name="banco-lista"),
    path("bancos/deleta/int:pk/", views.DeletaBanco.as_view(), name="banco-deleta"),
]