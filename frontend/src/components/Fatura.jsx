import React from "react";

function Fatura({ fatura }) {
    return(
        <div className="fatura-container">
            <p className="fatura-fechamento">Data de Fechamento: {fatura.data_fechamento}</p>
            <p className="fatura-vencimento">Data de Vencimento: {fatura.data_vencimento}</p>
            <p className="fatura-paga">{fatura.paga ? "Status: Paga" : "Status: Pendente"}</p>
            <p className="fatura-total">Valor Total: R$ {fatura.valor_total.toFixed(2)}</p>
        </div>
    );
}

export default Fatura;

