import {useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../api'

function CriarSubategoria() {
    const [nome, setNome] = useState("");
    const navigate = useNavigate();
    const { categoriaId } = useParams();

    const criarSubategoria = (e) => {
        e.preventDefault();

        if(!categoriaId) {
            alert("Categoria não selecionada!");
            return;
        }

        api
            .post("/api/subcategorias/cadastro/", {nome, categoria_id: categoriaId})
            .then((res) => {
                if (res.status === 201) {
                    alert("Subcategoria criada!");;
                    navigate("/categorias");
                } else {
                    alert("Falhou ao criar a subcategoria!")
                }
            })
            .catch((err) => alert("Erro ao criar subcategoria: " + err));
    };


    return (
        <div>
            <h2>Criar uma Subcategoria</h2>
            <form onSubmit={criarSubategoria}>
                <label htmlFor="nome">Nome:</label>
                <br />
                <input 
                    type="text"
                    id='nome'
                    name='nome'
                    required
                    onChange={(e) => setNome(e.target.value)}
                    value={nome} 
                />
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default CriarSubategoria;