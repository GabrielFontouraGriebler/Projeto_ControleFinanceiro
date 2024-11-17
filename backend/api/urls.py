from django.urls import path
from . import views

urlpatterns = [
    path("bancos/", views.ListaBancoCriado.as_view(), name="banco-lista"),
    path("bancos/cadastro/", views.CreateBancoView.as_view(), name="banco-cadastro"),
    path("bancos/deleta/<int:pk>/", views.DeletaBanco.as_view(), name="banco-deleta"),
    path("categorias/", views.ListarCategoria.as_view(), name="categoria-lista"),
    path("categorias/cadastro/", views.CriarCategoriaView.as_view(), name="categoria-cadastro"),
    path("categorias/deleta/<int:pk>/", views.DeletaCategoria.as_view(), name="banco-deleta"),
    path("subcategorias/", views.CriarSubcategoria.as_view(), name="subcategoria-lista"),
    path("subcategorias/cadastro/", views.CriarSubcategoria.as_view(), name="subcategoria-cadastro"),
    path("subcategorias/deleta/<int:pk>/", views.CriarSubcategoria.as_view(), name="categoria-deleta"),
]