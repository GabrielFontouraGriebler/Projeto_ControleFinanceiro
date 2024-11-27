import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Fatura } from "../components";
import api from "../api";

function ListagemFatura() {
  const { id } = useParams();
  const [faturas, setFaturas] = useState([]);

  const getFaturas = () => {
    api
      .get(`/api/cartoes/${id}/faturas/`) // Requisição com o Axios
      .then((res) => res.data) // Extrai os dados da resposta
      .then((data) => {
        console.log("Dados recebidos:", data);
        setFaturas(data);
      })
      .catch((err) => {
        console.error("Erro ao buscar faturas: ", err);
        alert("Erro ao buscar faturas: " + err.message);
      });
  };

  // useEffect que utiliza a função de requisição
  useEffect(() => {
    getFaturas();
  }, [id]);

  return (
    <div className="fatura-page">
      <h2 className="fatura-titulo">Faturas do Cartão de Crédito</h2>
      {Array.isArray(faturas) && faturas.length > 0 ? (
        faturas.map((fatura) => <Fatura key={fatura.id} fatura={fatura} />)
      ) : (
        <p>Nenhuma fatura encontrada para este cartão.</p>
      )}
    </div>
  );
}

export default ListagemFatura;
