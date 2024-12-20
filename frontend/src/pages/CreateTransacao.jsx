import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import "../styles/FormularioInterno.css";

function CriarTransacao() {
  const [tipoFinanceiro, setTipoFinanceiro] = useState("despesa");
  const [tipoTransacao, setTipoTransacao] = useState("debito");
  const [valor, setValor] = useState("");
  const [data, setData] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategoria] = useState([]);
  const [contas, setConstas] = useState([]);
  const [cartoes, setCartoes] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [subcategoriaSelecionada, setSubcategoriaSelecionada] = useState("");
  const [contaSelecionada, setContaSelecionada] = useState("");
  const [cartaoSelecionado, setCartaoSelecionado] = useState("");
  const [numeroParcelas, setNumeroParcelas] = useState(1);
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const [categoriaResponse, contasResponse, cartoesResponse] =
          await Promise.all([
            api.get("api/categorias/"),
            api.get("api/bancos/"),
            api.get("api/cartoes/"),
          ]);

        setCategorias(categoriaResponse.data);
        setConstas(contasResponse.data);
        setCartoes(cartoesResponse.data);
      } catch (error) {
        console.log("Erro ao carregar dados:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fatchSubcategorias() {
      if (categoriaSelecionada) {
        try {
          const response = await api.get(
            `api/categorias/${categoriaSelecionada}/subcategorias/`
          );
          setSubcategoria(response.data);
        } catch (error) {
          console.error("Erro ao carregar subcategorias:", error);
        }
      } else {
        setSubcategoria([]);
      }
    }

    fatchSubcategorias();
  }, [categoriaSelecionada]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const dataTransacao = {
      tipo_financeiro: tipoFinanceiro,
      tipo_transacao: tipoTransacao,
      valor: parseFloat(valor),
      data,
      categoria: categoriaSelecionada,
      subcategoria: subcategoriaSelecionada || null,
      conta: contaSelecionada,
      cartao_credito: cartaoSelecionado || null,
      numero_parcelas: parseInt(numeroParcelas, 10),
      descricao,
    };

    try {
      await api.post("/api/transacoes/cadastro/", dataTransacao);
      alert("Transacao cadastrada com sucesso!");
      setTipoFinanceiro("despesa");
      setTipoTransacao("debito");
      setValor("");
      setData("");
      setCategoriaSelecionada("");
      setSubcategoriaSelecionada("");
      setContaSelecionada("");
      setCartaoSelecionado("");
      setNumeroParcelas(1);
      setDescricao("");
    } catch (error) {
      console.log("Erro ao cadastrar transação:", error);
      alert("Ocorreu um erro ao cadastrar a transação.");
    }
  };

  return (
    <div>
      <h2 className="titulo-form">Cadastro de Transação</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <label htmlFor="tipo_financeiro">Selecione o Tipo Financeiro:</label>
        <select
          className="form-select"
          value={tipoFinanceiro}
          onChange={(e) => setTipoFinanceiro(e.target.value)}
        >
          <option value="despesa">Despesa</option>
          <option value="receita">Receita</option>
        </select>

        <label htmlFor="tipo_transacao">Tipo Transação:</label>
        <select
          className="form-select"
          value={tipoTransacao}
          onChange={(e) => setTipoTransacao(e.target.value)}
        >
          <option value="debito">Débito</option>
          <option value="credito">Crédito</option>
        </select>

        <input
          className="form-input"
          placeholder="Valor da Transação"
          type="number"
          step="0.01"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          required
        />

        <input
          className="form-input"
          placeholder="Data da Transação"
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          required
        />

        <label htmlFor="categoria">Categoria:</label>
        <select
          className="form-select"
          value={categoriaSelecionada}
          onChange={(e) => setCategoriaSelecionada(e.target.value)}
          required
        >
          <option value="">Selecione uma categoria</option>
          {categorias.map((categoria) => (
            <option value={categoria.id} key={categoria.id}>
              {categoria.nome}
            </option>
          ))}
        </select>

        <label htmlFor="subcategoria">Subcategoria:</label>
        <select
          className="form-select"
          value={subcategoriaSelecionada}
          onChange={(e) => setSubcategoriaSelecionada(e.target.value)}
        >
          <option value="">Selecione uma subcategoria</option>
          {subcategorias.map((subcategoria) => (
            <option value={subcategoria.id} key={subcategoria.id}>
              {subcategoria.nome}
            </option>
          ))}
        </select>

        <label htmlFor="conta">Conta:</label>
        <select
          className="form-select"
          value={contaSelecionada}
          onChange={(e) => setContaSelecionada(e.target.value)}
          required
        >
          <option value="">Selecione a conta</option>
          {contas.map((conta) => (
            <option value={conta.id} key={conta.id}>
              {conta.nome}
            </option>
          ))}
        </select>

        <label htmlFor="cartao_credito">Cartão de Crédito</label>
        <select
          className="form-select"
          value={cartaoSelecionado}
          onChange={(e) => setCartaoSelecionado(e.target.value)}
        >
          <option value="">Nenhum</option>
          {cartoes.map((cartao) => (
            <option value={cartao.id} key={cartao.id}>
              {cartao.nome_cartao}
            </option>
          ))}
        </select>

        <input
          className="form-input"
          placeholder="Numero de Parcelas"
          type="number"
          value={numeroParcelas}
          onChange={(e) => setNumeroParcelas(e.target.value)}
          min="1"
          required
        />

        <input
          className="form-input"
          placeholder="Descrição"
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />

        <button className="form-button" type="submit">
          Cadastrar Transação
        </button>
      </form>
    </div>
  );
}

export default CriarTransacao;
