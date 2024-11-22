import React from "react";

function Transacao({ transacao, onDelete }) {
    return (
        <div className="transacao-container">
            <p className="transacao-valor">{transacao.valor}</p>
            <p className="transacao-data">{transacao.data}</p>
            <p className="transacao-categoria">{transacao.categoria}</p>
            <p className="transacao-subcategoria">{transacao.subcategoria}</p>
            <p className="transacao-conta">{transacao.conta}</p>
            <p className="transacao-descricao">{transacao.descricao}</p>
            <p className="transacao-valor-parcela">{transacao.valor_parcela}</p>
            <p className="transacao-numero-parcela">{transacao.numero_parcela}</p>
            <button className="deletar-transacao" onClick={() => onDelete(transacao.id)}>
                Deletar Transação
            </button>
        </div>
    );
}

export default Transacao;