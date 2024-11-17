import React  from "react";
import { useNavigate } from "react-router-dom";

function Categoria({categoria, subcategoria, onDelete}) {

    const navigate = useNavigate();

    const handleAddSubcategoria = (categoriaId) => {
        navigate(`/subcategoria/cadastro?${categoriaId}`)
    }

    const subcategoriasFiltro = Array.isArray(subcategoria)
    ? subcategoria.filter((sub) => sub.categoria_id === categoria.id)
    : [];

    return(
        <div className="categoria-container">
            <p className="categoria-nome">{categoria.nome}</p>
            <p className="categoria-tipo-categoria">{categoria.tipo_categoria}</p>
            <button className="delete-button" onClick={() => onDelete(categoria.id)}>
                Deletar
            </button>
            <button 
                className="adicionar-subcategoria-button"
                onClick={() => handleAddSubcategoria(categoria.id)}
            >
                Adicionar Subcategoria
            </button>

            <div className="subcategoria-lista">
                {subcategoriasFiltro.map((sub) => (
                    <div
                        key={sub.id}
                        className="subcategoria-container">
                            <p className="subcategoria-nome">{sub.nome}</p>
                            <button 
                                className="delete-sucategoria-button"
                                onDelete={() => console.log(`Deletar subcategoria ${sub.id}`)}
                            >
                                Deletar
                            </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Categoria;