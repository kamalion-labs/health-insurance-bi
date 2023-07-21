"use client";

import { Chart } from "@/components";
import { BarTotalLayer } from "@/lib/util/charts/bars";
import { BarSvgProps } from "@nivo/bar";
import { Pessoa } from "@prisma/client";
import { differenceInYears } from "date-fns";

const labels = ["Masculino", "Feminino"];

type DataType = {
  Faixa: string;
  Masculino: number;
  MasculinoColor: string;
  Feminino: number;
  FemininoColor: string;
};

function addChartData(data: Pessoa[], inicio: number, fim?: number) {
  const pessoas = data.filter((pessoa) => {
    const idade = differenceInYears(new Date(), pessoa.dataNascimento!);

    return idade >= inicio && idade <= (fim || 999);
  });

  return {
    Faixa: fim ? `${inicio}-${fim}` : `${inicio} ou mais`,
    Feminino: pessoas.filter((pessoa) => pessoa.sexo === "F", []).length,
    Masculino: pessoas.filter((pessoa) => pessoa.sexo === "M", []).length,

    FemininoColor: "#F87171",
    MasculinoColor: "#5B93FF",
  };
}

export function GraficoSexoFaixaEtaria({ data }: { data: Pessoa[] }) {
  const chartData: DataType[] = [];

  chartData.push(addChartData(data, 0, 18));

  // Dos 19 aos 48 cria um intervalo de 4 anos por faixa
  for (let i = 19; i <= 58; i = i + 5) {
    chartData.push(addChartData(data, i, i + 4));
  }

  chartData.push(addChartData(data, 59));

  const options: Omit<BarSvgProps<any>, "width" | "height"> = {
    keys: labels,
    indexBy: "Faixa",
    data: chartData,
    margin: { top: 30, right: 130, bottom: 40, left: 120 },
    layers: [
      "grid",
      "axes",
      "markers",
      "bars",
      "legends",
      "annotations",
      BarTotalLayer,
    ],
  };

  return <Chart.Bar {...options} />;
}
