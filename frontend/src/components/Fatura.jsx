import React from "react";
import "../styles/Fatura.css";

function Fatura({ fatura }) {
  return (
    <div className="fatura-page-contianer">
      <div className="fatura-container">
        <p className="fatura-fechamento">
          Data de Fechamento: {fatura.data_fechamento}
        </p>
        <p className="fatura-vencimento">
          Data de Vencimento: {fatura.data_vencimento}
        </p>
        <p className="fatura-paga">
          {fatura.paga ? "Status: Paga" : "Status: Pendente"}
        </p>
        <p className="fatura-total">
          Valor Total: R${" "}
          {fatura.valor_total ? fatura.valor_total.toFixed(2) : "0.00"}
        </p>
      </div>
    </div>
  );
}

export default Fatura;
