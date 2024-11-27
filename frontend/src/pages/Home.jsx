import { useState, useEffect } from "react";
import api from "../api";
import Banco from "../components/Banco";
import { useNavigate } from "react-router-dom";
import Categoria from "../components/Categoria";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "../styles/Home.css";

Chart.register(CategoryScale, LinearScale, BarElement);
Chart.register(ChartDataLabels);

function Home() {
  const [bancos, setBancos] = useState([]);
  const [nome, setNomes] = useState("");
  const [tipo_conta, SetTipoConta] = useState("");
  const [saldo_inicial, setSaldoInicial] = useState("");
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();
  const [dadosGrafico, setDadosGrafico] = useState([]);
  const [saldoAtual, setSaldoAtual] = useState(0);

  useEffect(() => {
    api
      .get("/api/saldo_atual/")
      .then((res) => setSaldoAtual(res.data.saldo_atual))
      .catch((err) => console.error("Erro ao carregar o saldo atual: ", err));
  }, []);

  useEffect(() => {
    api
      .get("/api/graficos/transacoes/")
      .then((res) => setDadosGrafico(res.data))
      .catch((err) =>
        console.error("Erro ao carregar os dados do gráfico: ", err)
      );
  }, []);

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
    navigate("/categoria/cadastro/");
  };

  const meses = dadosGrafico.map((item) =>
    new Date(item.mes).toLocaleString("default", {
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    })
  );
  const valores = dadosGrafico.map((item) => item.total); // Total de transações por mês
  const data = {
    labels: meses,
    datasets: [
      {
        label: "Valor total gasto por mês",
        data: valores,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(199, 199, 199, 0.6)",
          "rgba(83, 102, 255, 0.6)",
          "rgba(255, 79, 94, 0.6)",
          "rgba(240, 196, 25, 0.6)",
          "rgba(100, 181, 246, 0.6)",
          "rgba(56, 142, 60, 0.6)",
        ], // Cores distintas para cada mês
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(199, 199, 199, 1)",
          "rgba(83, 102, 255, 1)",
          "rgba(255, 79, 94, 1)",
          "rgba(240, 196, 25, 1)",
          "rgba(100, 181, 246, 1)",
          "rgba(56, 142, 60, 1)",
        ],
        borderWidth: 2,
        hoverBackgroundColor: "rgba(0, 0, 0, 0.1)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2,
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Mês",
          font: {
            size: 16,
          },
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Valor Total (R$)",
          font: {
            size: 16,
          },
        },
        ticks: {
          callback: function (value) {
            const numValue = Number(value);
            return "R$ " + (isNaN(numValue) ? 0 : numValue.toFixed(2));
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          font: {
            size: 14,
          },
          boxWidth: 20,
          padding: 15,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            const rawValue = Number(context.raw);
            label += "R$ " + (isNaN(rawValue) ? 0 : rawValue.toFixed(2));
            return label;
          },
        },
      },
      datalabels: {
        display: true,
        anchor: "end",
        align: "top",
        formatter: function (value) {
          const numValue = Number(value);
          return "R$ " + (isNaN(numValue) ? 0 : numValue.toFixed(2));
        },
        font: {
          size: 12,
        },
      },
    },
    animation: {
      duration: 1500,
      easing: "easeInOutQuart",
    },
  };

  return (
    <div>
      <div>
        <h2>Saldo Atual: R$ {saldoAtual.toFixed(2)}</h2>{" "}
        {/* Exibe o saldo atual */}
      </div>
      <div
        style={{
          position: "relative",
          width: "80%",
          height: "400px",
          margin: "0 auto",
        }}
      >
        <h2>Gráfico de Transações por Categoria</h2>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default Home;
