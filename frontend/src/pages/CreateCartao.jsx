import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { FaHandMiddleFinger } from "react-icons/fa";

function CriarCartaoCredito() {
    const [nomeCartao, setNomeCartao] = useState("");
    const [limiteCredito, setLimiteCredito] = useState("");
    const [dataFechamento, setDataFechamento] = useState("");
    const [dataVencimento, setDataVencimento] = useState("");
    const [bandeira, setBandeira] = useState("visa");
    const [contas, setContas] = useState([]);
    const [contaSelecionada, setContaSelecionada] = useState("");

    useEffect(() => {
        async function fetchContas() {
            try {
                const response = await api.get("api/bancos/");
                setContas(response.data);
            } catch (error) {
                console.log("Erro ao carregar contas:", error);
            }
        }

        fetchContas();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const dataCartao = {
            nome_cartao: nomeCartao,
            limite_credito: parseFloat(limiteCredito),
            data_fechamento: parseInt(dataFechamento, 10),
            data_vencimento: parseInt(dataVencimento, 10),
            bandeira,
            conta: parseInt(contaSelecionada, 10),
        };

        try {
            await api.post("/api/cartoes/cadastro/", dataCartao);
            alert("Cartão de credito cadastrado com sucesso!");
            setNomeCartao("");
            setLimiteCredito("");
            setDataFechamento("");
            setDataVencimento("");
            setBandeira("visa");
            setContaSelecionada("");
        } catch (error) {
            console.log("Erro ao cadastrar cartão de crédito:", error);
            console.log("Conta Selecionada:", contaSelecionada);
            alert("Ocorreu um erro ao cadastrar o cartão de crédito.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Cadastro de Cartão de Crédito</h2>

            <label htmlFor="nome_cartao">Nome do Cartão:</label>
            <input type="text" value={nomeCartao} onChange={(e) => setNomeCartao(e.target.value)} required />

            <label htmlFor="limite_credito">Limite de Crédito:</label>
            <input type="number" step="0.01" value={limiteCredito} onChange={(e) => setLimiteCredito(e.target.value)} required />

            <label htmlFor="data_fechamento">Data de Fechamento:</label>
            <input type="number" value={dataFechamento} onChange={(e) => setDataFechamento(e.target.value)} min="1" max="31" required />

            <label htmlFor="data_vencimento">Data de Vencimento:</label>
            <input type="number" value={dataVencimento} onChange={(e) => setDataVencimento(e.target.value)} min="1" max="31" required />

            <label htmlFor="bandeira">Bandeira:</label>
            <select value={bandeira} onChange={(e) => setBandeira(e.target.value)} required>
                <option value="visa">Visa</option>
                <option value="mastercard">Mastercard</option>
                <option value="hipercard">Hipercard</option>
                <option value="elo">Elo</option>
                <option value="outra_bandeira">Outra Bandeira</option>
            </select>

            <label htmlFor="conta">Conta:</label>
            <select value={contaSelecionada} onChange={(e) => setContaSelecionada(e.target.value)} required>
                <option value="">Selecione a Conta</option>
                {contas.map((conta) => (
                    <option value={conta.id} key={conta.id}>
                        {conta.nome}
                    </option>
                ))}
            </select>

            <button type="submit">Cadastrar Catão de Crédito</button>
        </form>
    );
}

export default CriarCartaoCredito;