import React from "react";
import "../styles/Transacao.css";

function Transacao({ transacao, onDelete }) {
    const tipoClasse = transacao.tipo_financeiro?.toLowerCase() === "receita" ? "receita" : "despesa";

  return (
    <div className="transacao-page-container">
      <div className="transacao-container">
        <p className="transacao-tipo-financeiro">{transacao.tipo_financeiro.charAt(0).toUpperCase() + transacao.tipo_financeiro.slice(1)}</p>
        <p className={`transacao-valor ${tipoClasse}`}>
          Valor da Transação: R${transacao.valor}
        </p>
        <p className="transacao-data">
            Data da Transação: {new Date(transacao.data).toLocaleDateString("pt-BR")}
        </p>
        <p className="transacao-categoria">Categoria: {transacao.categoria_selecionada}</p>
        <p className="transacao-subcategoria">
          Subcategoria: {transacao.subcategoria_selecionada}
        </p>
        <p className="transacao-conta">Conta: {transacao.conta_selecionada}</p>
        <p className="transacao-descricao"> Descrição: {transacao.descricao}</p>
        <p className={`transacao-valor-parcela ${tipoClasse}`}>
          Valor da Parcela: {transacao.valor_parcela}
        </p>
        <p className="transacao-numero-parcela">
          Numero da Parcela: {transacao.numero_parcelas}
        </p>
        <button
          className="deletar-transacao"
          onClick={() => onDelete(transacao.id)}
        >
          Deletar Transação
        </button>
      </div>
    </div>
  );
}

export default Transacao;
