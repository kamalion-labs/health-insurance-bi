"use client";

import { Evento } from "@prisma/client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { format } from "date-fns";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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

export function GraficoSinistralidadeTempo({ data }: { data: Evento[] }) {
  const labels = data.map((comp) =>
    format(new Date(comp.dataPagamento!), "MM/yyyy")
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: "Meta",
        data: data.map(() => 70),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        label: "Sinistralidade",
        data: data.map((comp) => (+comp.sinistro * 100) / +comp.custoTotal),
        borderColor: "#5B93FF",
        backgroundColor: "#5B93FF",
      },
    ],
  };

  return <Line options={options} data={chartData} />;
}
