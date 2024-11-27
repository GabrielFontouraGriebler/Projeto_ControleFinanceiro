import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CartaoCredito.css";

function CartaoCredito({ cartao, onDelete }) {
  const navigate = useNavigate();

  const handleFaturaRedirect = () => {
    navigate(`/cartoes/${cartao.id}/faturas`);
  };

  const TIPO_BANDEIRA_MAP = {
    visa: "Visa",
    mastercard: "Mastercard",
    hipercard: "Hipercard",
    elo: "Elo",
    outra_bandeira: "Outra Bandeira",
  };

  return (
    <div className="cartao-container">
      <p className="cartao-nome">{cartao.nome_cartao}</p>
      <p className="cartao-limite-credito">
        Limite de Crédito: R$ {cartao.limite_credito}
      </p>
      {/* <p className="cartao-limite-utilizado">{cartao.limite_utilizado}</p> */}
      <p className="cartao-data-fechamento">
        Dia de Fechamento da Fatura: {cartao.data_fechamento}
      </p>
      <p className="cartao-data-vencimento">
        Dia de Vencimento da Fatura: {cartao.data_vencimento}
      </p>
      <p className="cartao-bandeira"> Bandeira do Cartão: {TIPO_BANDEIRA_MAP[cartao.bandeira] || cartao.bandeira}</p>
      <p className="cartao-conta">Conta: {cartao.conta_nome}</p>
      <button className="delete-button" onClick={() => onDelete(cartao.id)}>
        Deletar Cartão
      </button>
      <button className="faturas-button" onClick={handleFaturaRedirect}>
        Ver Fatura do Cartão
      </button>
    </div>
  );
}

export default CartaoCredito;
