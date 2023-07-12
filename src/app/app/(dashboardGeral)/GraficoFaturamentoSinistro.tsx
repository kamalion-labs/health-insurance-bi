"use client";

import { Competencia } from "@prisma/client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { format } from "date-fns";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

// const labels = ["January", "February", "March", "April", "May", "June", "July"];

export function GraficoFaturamentoSinistro({ data }: { data: Competencia[] }) {
  const labels = data.map((comp) => format(new Date(comp.data), "MM/yyyy"));

  const chartData = {
    labels,
    datasets: [
      {
        label: "Faturamento",
        data: data.map((comp) => +comp.faturamento),
        borderColor: "#52CD9F",
        backgroundColor: "#52CD9F",
      },
      {
        label: "Sinistro",
        data: data.map((comp) => +comp.sinistro),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Coparticipacao",
        data: data.map((comp) => +comp.coparticipacao),
        borderColor: "#5B93FF",
        backgroundColor: "#5B93FF",
      },
    ],
  };

  return <Bar options={options} data={chartData} />;
}
