import { useState, useEffect } from "react";
import api from "../api";
import Banco from "../components/Banco";
import { useNavigate } from "react-router-dom";
import Categoria from "../components/Categoria";

function Home() {
  const [bancos, setBancos] = useState([]);
  const [nome, setNomes] = useState("");
  const [tipo_conta, SetTipoConta] = useState("");
  const [saldo_inicial, setSaldoInicial] = useState("");
  const [categorias, setCategorias] = useState([])
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

  useEffect(() => {
    getCategorias();
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

  const handleCadastroCategoriaRedirect = () => {
    navigate("/categoria/cadastro/")
  }

  return (
    <div>
      <div>
        <h2>Bancos</h2>
        {bancos.map((banco) => (
          <Banco banco={banco} onDelete={deleteBanco} key={banco.id} />
        ))}
      </div>
      <br />
      <button onClick={handleCadastroRedirect}>Cadastrar Novo Banco</button>
      <div>
        <h2>Categorias</h2>
        {categorias.map((categoria) => (
          <Categoria categoria={categoria} onDelete={deletarCategoria} key={categoria.id} />
        ))}
      </div>
      <br />
      <button onClick={handleCadastroCategoriaRedirect}>Cadastrar Nova Categoria</button>
    </div>
  );


}

export default Home;
