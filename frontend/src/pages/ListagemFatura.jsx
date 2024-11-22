import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { Fatura } from "../components";

function ListagemFatura() {
    const {id} = useParams();
    const {faturas, setFaturas} = useState([]);

    useEffect(() => {
        fetch(`api/cartoes/${id}/faturas/`)
        .then((ress) => ress.json())
        .then((data) => setFaturas(data))
        .catch((err) => console.error("Erro ao bucar faturas: ", err));
    }, [id]);

    return (
        <div>
            <h2>Faturas do Cartão de Crédito</h2>
            {Array.isArray(faturas) && faturas.length > 0 ? (
                faturas.map((fatura) => (
                    <Fatura key={fatura.id} fatura={fatura} />
                ))
            ) : (
                <p>Nenhuma fatura encontrada para este cartão.</p>
            )}
        </div>
    );
}

export default ListagemFatura;