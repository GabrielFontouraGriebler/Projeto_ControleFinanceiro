import React from "react";
import "../styles/Banco.css";

const TIPO_CONTA_MAP = {
  conta_corrente: "Conta Corrente",
  carteira: "Carteira",
  poupanca: "Poupança",
  investimentos: "Investimentos",
  outros: "Outros...",
};

function Banco({ banco, onDelete }) {
  const formattedDate = new Date(banco.data_criacao).toLocaleDateString(
    "pt-BR"
  );

  return (
    <div className="banco-container">
      <p className="banco-nome">{banco.nome}</p>
      <p className="banco-tipo-conta">
        Tipo Conta: {TIPO_CONTA_MAP[banco.tipo_conta] || banco.tipo_conta}
      </p>
      <p className="banco-saldo-inicial">
        Saldo Inicial: R$ {banco.saldo_inicial}
      </p>
      <p className="banco-saldo-data">Data de Criação: {formattedDate}</p>
      <button className="delete-button" onClick={() => onDelete(banco.id)}>
        Deletar Banco
      </button>
    </div>
  );
}

export default Banco;
