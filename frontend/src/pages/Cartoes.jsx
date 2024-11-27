import { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { CartaoCredito } from "../components";
import "../styles/CartaoCredito.css";

function Cartoes() {
  const [cartoes, setCartoes] = useState([]);
  const navigate = useNavigate();

  const getCartoes = () => {
    api
      .get("api/cartoes/")
      .then((res) => res.data)
      .then((data) => {
        setCartoes(data), console.log(data);
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    getCartoes();
  }, []);

  const deletarCartao = (id) => {
    api
      .delete(`/api/cartoes/deleta/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Cartão Deletado!");
        else alert("Falhou em deletar o cartão.");
        getCartoes();
      })
      .catch((err) => alert(err));
  };

  const handleCadastraoCartaoRedirect = () => {
    navigate("/cartao/cadastro/");
  };

  return (
    <div className="cartao-page-container">
      <div>
        <h2 className="cartao-titulo">Cartões de Crédito</h2>
        {cartoes.map((cartao) => (
          <CartaoCredito
            cartao={cartao}
            onDelete={deletarCartao}
            key={cartao.id}
          />
        ))}
      </div>
      <br />
      <button className="create-cartao" onClick={handleCadastraoCartaoRedirect}>
        Cadastrar Novo Cartão de Credito
      </button>
    </div>
  );
}

export default Cartoes;
