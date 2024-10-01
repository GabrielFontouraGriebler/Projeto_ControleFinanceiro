import React from "react";

function Banco({ banco, onDelete }) {
  const formattedDate = new Date(banco.data_criacao).toLocaleDateString("pt-BR");

  return (
    <div className="banco-container">
      <p className="banco-nome">{banco.nome}</p>
      <p className="banco-tipo-conta">{banco.tipo_conta}</p>
      <p className="banco-saldo-inicial">{banco.saldo_inicial}</p>
      <p className="banco-saldo-data">{formattedDate}</p>
      <button className="delete-button" onClick={() => onDelete(banco.id)}>
        Deletar
      </button>
    </div>
  );
}

export default Banco;
