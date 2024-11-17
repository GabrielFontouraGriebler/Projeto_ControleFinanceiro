import { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

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
      <h2>Crie um Banco</h2>
      <form onSubmit={createBanco}>
        <label htmlFor="nome">Nome:</label>
        <br />
        <input
          type="text"
          id="nome"
          name="nome"
          required
          onChange={(e) => setNomes(e.target.value)}
          value={nome}
        />
        <br />
        <label htmlFor="tipo_conta_select">Selecione o tipo de conta:</label>
        <br />
        <select
          id="tipo_conta_select"
          name="tipo_conta_select"
          required
          onChange={(e) => SetTipoConta(e.target.value)}
          value={tipo_conta}
        >
          <option value="" disabled>
            --Selecione uma opção--
          </option>
          <option value="poupanca">Poupança</option>
          <option value="conta_corrente">Corrente</option>
        </select>
        <br />
        <label htmlFor="saldo_inicial">Saldo Inicial:</label>
        <br />
        <input
          type="text"
          id="saldo_inicial"
          name="saldo_inicial"
          required
          onChange={(e) => setSaldoInicial(e.target.value)}
          value={saldo_inicial}
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
export default CreateBanco;
