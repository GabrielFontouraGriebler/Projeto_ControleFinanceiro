import React, { useState, useEffect } from "react";
import { Transacao } from "../components";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/Transacao.css";

function ListagemTransacao() {
  const [transacaoes, setTransacoes] = useState([]);
  const navigate = useNavigate();

  const handleCadastrarTransacaoRedirect = () => {
    navigate("/transacao/cadastro");
  };

  const getTransacoes = () => {
    api
      .get("/api/transacoes/")
      .then((res) => res.data)
      .then((data) => {
        setTransacoes(data), console.log(data);
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    getTransacoes();
  }, []);

  const deletarTransacao = (id) => {
    api
      .delete(`/api/transacoes/deleta/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Transação deletada!");
        else alert("Falhou ao deletar transação.");
        getTransacoes();
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="transacao-page">
      <div>
        <h2 className="transacao-titulo">Transações</h2>
        {transacaoes.map((transacao) => (
          <Transacao
            transacao={transacao}
            onDelete={deletarTransacao}
            key={transacao.id}
          />
        ))}
      </div>
      <br />
      <div className="button-conatiner">
        <button
          className="create-transacao"
          onClick={handleCadastrarTransacaoRedirect}
        >
          Cadastrar Nova Transação
        </button>
      </div>
    </div>
  );
}

export default ListagemTransacao;
