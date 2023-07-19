import { Chart } from "@/components";
import { Pessoa } from "@prisma/client";

const faixas = [
  "0-18",
  "19-23",
  "24-28",
  "29-33",
  "34-38",
  "39-43",
  "44-48",
  "49-53",
  "54-58",
  "59 ou mais",
];

const labels = ["Masculino", "Feminino"];

type DataType = {
  Faixa: string;
  Masculino: number;
  MasculinoColor: string;
  Feminino: number;
  FemininoColor: string;
};

function addChartData(idx: number, feminino: number, masculino: number) {
  return {
    Faixa: faixas[idx],
    Feminino: feminino,
    FemininoColor: "#F87171",
    Masculino: masculino,
    MasculinoColor: "#5B93FF",
  };
}

export function GraficoSexoFaixaEtaria({ data }: { data: Pessoa[] }) {
  const chartData: DataType[] = [];

  chartData.push(addChartData(0, 0, 0));
  chartData.push(addChartData(1, 0, 0));
  chartData.push(addChartData(2, 0, 0));
  chartData.push(addChartData(3, 1, 1));
  chartData.push(addChartData(4, 0, 0));
  chartData.push(addChartData(5, 0, 0));
  chartData.push(addChartData(6, 0, 0));
  chartData.push(addChartData(7, 0, 0));
  chartData.push(addChartData(8, 0, 0));
  chartData.push(addChartData(9, 0, 0));

  const options = {
    keys: labels,
    indexBy: "Faixa",
    data: chartData,
  };

  return <Chart.Bar {...options} />;
}
