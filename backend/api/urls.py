from django.urls import path
from . import views

urlpatterns = [
    path("bancos/", views.ListaBancoCriado.as_view(), name="banco-lista"),
    path("bancos/cadastro/", views.CreateBancoView.as_view(), name="banco-cadastro"),
    path("bancos/deleta/<int:pk>/", views.DeletaBanco.as_view(), name="banco-deleta"),
    path("categorias/", views.ListarCategoria.as_view(), name="categoria-lista"),
    path("categorias/cadastro/", views.CriarCategoriaView.as_view(), name="categoria-cadastro"),
    path("categorias/deleta/<int:pk>/", views.DeletaCategoria.as_view(), name="banco-deleta"),
    path("categorias/<int:categoria_id>/subcategorias/", views.ListarSubcategoriasPorCategoria.as_view(), name="subcategoria-por-categoria"),
    path("subcategorias/", views.ListarSubcategoria.as_view(), name="subcategoria-lista"),
    path("subcategorias/cadastro/", views.CriarSubcategoria.as_view(), name="subcategoria-cadastro"),
    path("subcategorias/deleta/<int:pk>/", views.DeletarSubcategoria.as_view(), name="categoria-deleta"),
    path("transacoes/", views.ListarTransacao.as_view(), name="transacao-lista"),
    path("transacoes/cadastro", views.CriarTransacao.as_view(), name="trasacao-cadastro"),
    path("transacoes/deleta/<int:pk>/", views.DeletarTransacao.as_view(), name="tranacao-deleta"),
    path("faturas/", views.ListarFatura.as_view(), name="fatura-lista"),
    path("cartoes/", views.ListarCartaoCredito.as_view(), name="cartao-lista"),
    path("cartoes/cadastro/", views.CriarCartaoCredito.as_view(), name="cartao-cadastro"),
    path("cartoes/deleta/<int:pk>/", views.DeletarCartaoCredito.as_view(), name="cartao-deleta"),
    path("cartoes/<int:cartao_id>/faturas/", views.ListarFatura.as_view(), name="fatura-lista"),
]