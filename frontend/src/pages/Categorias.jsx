import {useState, useEffect} from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { Categoria } from "../components";

function Categorias() {
    const [categorias, setCategorias] = useState([])
    const [subcategoria, setSubcategoria] = useState([])
    const navigate = useNavigate();
  
    useEffect(() => {
      getCategorias();
    }, []);

    useEffect(() => {
        getSubcategoria();
    }, []);
  
    const getCategorias = () => {
      api
        .get("api/categorias/")
        .then((res) => res.data)
        .then((data) => {
          setCategorias(data), console.log(data);
        })
        .catch((err) => alert(err));
    };

    const getSubcategoria = () => {
        api
            .get("api/subcategorias/")
            .then((res) => res.data)
            .then((data) => {
                setSubcategoria(data), console.log(data);
            })
            .catch((err) => alert(err));
    };
  
    const deletarCategoria = (id) => {
      api
        .delete(`/api/categorias/deleta/${id}/`)
        .then((res) => {
          if (res.status === 204) alert("Categoria deletada!");
          else alert("Falhou em deletar a categoria.");
          getCategorias();
        })
        .catch((error) => alert(error));
    };

    const deletarSubcategoria = (id) => {
        api
            .delete(`/api/subcategorias/deleta/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Subcategoria deletada!");
                else alert("Falhou ao deletar a categoria.")
                getSubcategoria();
            })
            .catch((error) => alert(error));
    };
  
    const handleCadastroCategoriaRedirect = () => {
      navigate("/categoria/cadastro/")
    }

    const handleCadastroSubcategoriaRedirect = () => {
        navigate("/subcategorias/cadastro")
    }

    return (
        <div>
          <div>
          <h2>Categorias</h2>
            {categorias.map((categoria) => (
              <Categoria 
                categoria={categoria} 
                subcategoria={subcategoria}
                onDelete={deletarCategoria}
                onDeleteSubcategoria={deletarSubcategoria} 
                key={categoria.id} 
              />
            ))}
          </div>
          <br />
          <button onClick={handleCadastroCategoriaRedirect}>Cadastrar Nova Categoria</button>
        </div>
      );
}

export default Categorias;