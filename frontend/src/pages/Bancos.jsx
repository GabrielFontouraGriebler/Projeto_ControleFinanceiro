import { useState, useEffect } from "react";
import api from "../api";
import Banco from "../components/Banco";
import { useNavigate } from "react-router-dom";
import "../styles/Banco.css";

function Bancos() {
  const [bancos, setBancos] = useState([]);
  const navigate = useNavigate();

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
      .delete(`/api/bancos/deleta/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Banco deletado!");
        else alert("Falhou em deletar o banco.");
        getBancos();
      })
      .catch((error) => alert(error));
  };

  const handleCadastroRedirect = () => {
    navigate("/banco/cadastro/");
  };

  return (
    <div className="banco-page">
      <div>
        <h2 className="banco-titulo">Bancos</h2>
        {bancos.map((banco) => (
          <Banco banco={banco} onDelete={deleteBanco} key={banco.id} />
        ))}
      </div>
      <br />
      <button className="create-banco" onClick={handleCadastroRedirect}>
        Cadastrar Novo Banco
      </button>
    </div>
  );
}

export default Bancos;
