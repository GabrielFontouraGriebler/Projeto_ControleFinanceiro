import { useState, useEffect } from "react";
import api from "../api";

function Home() {
  const [bancos, setBancos] = useState([]);
  const [nome, setNomes] = useState("");
  const [tipo_conta, SetTipoConta] = useState("");
  const [valor_selecionado, SetValorSelecionado] = useState("");
  const [saldo_inicial, setSaldoInicial] = useState("");

  useEffect(() => {
    getBancos();
  }, []);

  const getBancos = () => {
    api
      .get("/api/bancos/")
      .then((res) => res.data)
      .then((data) => {
        setBancos(data), console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteBanco = (id) => {
    api
      .delete(`/api/bancos/delete/${id}`)
      .then((res) => {
        if (res.status === 204) alert("Banco deletado!");
        else alert("Falhou em deletar o banco.");
      })
      .catch((error) => alert(error));
    getBancos();
  };

  const createBanco = (e) => {
    e.preventDefault();
    api
      .post("/api/bancos/", { nome, tipo_conta, saldo_inicial })
      .then((res) => {
        if (res.status === 201) alert("Banco criado!");
        else alert("Falhou em criar o banco.");
      })
      .catch((err) => alert(err));
    getBancos();
  };

  return (
    <div>
      <div>
        <h2>Bancos</h2>
      </div>
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

export default Home;
