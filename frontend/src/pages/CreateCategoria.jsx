import { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import "../styles/FormularioInterno.css";

function CriarCategoria() {
  const [categorias, setCategorias] = useState([]);
  const [nome, setNomes] = useState("");
  const [tipo_categoria, setTipoCategoria] = useState("");
  const navigate = useNavigate();

  const criarCategoria = (e) => {
    e.preventDefault();
    api
      .post("/api/categorias/cadastro/", { nome, tipo_categoria })
      .then((res) => {
        if (res.status === 201) {
          alert("Categoria criada!");
          navigate("/categorias");
        } else {
          alert("Falhou ao criar categoria!");
        }
      })
      .catch((err) => alert(err));
  };

  return (
    <div>
      <h2 className="titulo-form">Crie uma Categoria</h2>
      <form onSubmit={criarCategoria} className="form-container">
        <br />
        <input
          className="form-input"
          placeholder="Nome da Categoria"
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
          onChange={(e) => setTipoCategoria(e.target.value)}
          value={tipo_categoria}
        >
          <option value="" disabled>
            --Selecione o Tipo de Categoria--
          </option>
          <option value="despesa">Despesa</option>
          <option value="receita">Receita</option>
        </select>
        <br />
        <input
          className="form-button"
          type="submit"
          value="Cadastrar Categoria"
        />
      </form>
    </div>
  );
}

export default CriarCategoria;
