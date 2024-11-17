import { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function CriarCategoria() {
    const [categorias, setCategorias] = useState([]);
    const [nome, setNomes] = useState("");
    const [tipo_categoria, setTipoCategoria] = useState("");
    const navigate = useNavigate();

    const criarCategoria = (e) => {
        e.preventDefault();
        api
            .post("/api/categorias/cadastro/", { nome, tipo_categoria})
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

    return(
        <div>
            <h2>Crie uma Categoria</h2>
            <form onSubmit={criarCategoria}>
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
            <label htmlFor="tipo_conta_select">Selecione o tipo de categoria:</label>
            <br />
            <select
                id="tipo_conta_select"
                name="tipo_conta_select"
                required
                onChange={(e) => setTipoCategoria(e.target.value)}
                value={tipo_categoria}
            >
                <option value="" disabled>
                    --Selecione uma opção--
                </option>
                <option value="despesa">Despesa</option>
                <option value="receita">Receita</option>
            </select>
            <br />
            <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default CriarCategoria;

