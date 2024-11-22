import React from "react";
import { useNavigate } from "react-router-dom";

function CartaoCredito({cartao, onDelete}) {

    const navigate = useNavigate();

    const handleFaturaRedirect = () => {
        navigate(`/cartoes/${cartao.id}/faturas`);
    }
    
    return (
        <div className="cartao-container">
            <p className="cartao-nome">{cartao.nome_cartao}</p>
            <p className="cartao-limite-credito">{cartao.limite_credito}</p>
            <p className="cartao-limite-utilizado">{cartao.limite_utilizado}</p>
            <p className="cartao-data-fechamento">{cartao.data_fechamento}</p>
            <p className="cartao-data-vencimento">{cartao.data_vencimento}</p>
            <p className="cartao-bandeira">{cartao.bandeira}</p>
            <p className="cartao-conta">{cartao.conta}</p>
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