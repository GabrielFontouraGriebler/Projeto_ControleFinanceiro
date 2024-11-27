import { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import "../styles/FormularioInterno.css";

function CreateBanco() {
  const [bancos, setBancos] = useState([]);
  const [nome, setNomes] = useState("");
  const [tipo_conta, SetTipoConta] = useState("");
  const [saldo_inicial, setSaldoInicial] = useState("");
  const navigate = useNavigate();

  const createBanco = (e) => {
    e.preventDefault();
    api
      .post("/api/bancos/cadastro/", { nome, tipo_conta, saldo_inicial })
      .then((res) => {
        if (res.status === 201) {
          alert("Banco criado!");
          navigate("/bancos");
        } else {
          alert("Falhou em criar o banco.");
        }
      })
      .catch((err) => alert(err));
  };

  return (
    <div>
      <h2 className="titulo-form">Crie um Banco</h2>
      <form onSubmit={createBanco} className="form-container">
        <br />
        <input
          className="form-input"
          placeholder="Nome do Banco"
          type="text"
          id="nome"
          name="nome"
          required
          onChange={(e) => setNomes(e.target.value)}
          value={nome}
        />
        <br />
        <select
          className="form-select"
          id="tipo_conta_select"
          name="tipo_conta_select"
          required
          onChange={(e) => SetTipoConta(e.target.value)}
          value={tipo_conta}
        >
          <option value="" disabled>
            --Selecione o tipo de conta--
          </option>
          <option value="poupanca">Poupança</option>
          <option value="conta_corrente">Corrente</option>
        </select>
        <br />
        <input
          className="form-input"
          placeholder="Qual o Saldo Inicial?"
          type="text"
          id="saldo_inicial"
          name="saldo_inicial"
          required
          onChange={(e) => setSaldoInicial(e.target.value)}
          value={saldo_inicial}
        />
        <br />
        <input className="form-button" type="submit" value="Cadastrar Banco" />
      </form>
    </div>
  );
}
export default CreateBanco;
