"use client";

import { Chart } from "@/components";
import { PieSvgProps } from "@nivo/pie";
import { Pessoa } from "@prisma/client";

type DataType = {
  id: string;
  value: number;
  color: string;
};

export function GraficoRiscoDM({ data }: { data: Pessoa[] }) {
  const chartData: DataType[] = [];

  chartData.push({
    id: "Baixo",
    value: data.filter((x) => x.scoreDiabetes! < 0.6).length,
    color: "#5B93FF",
  });

  chartData.push({
    id: "Medio",
    value: data.filter((x) => x.scoreDiabetes! >= 0.6 && x.scoreDiabetes! < 0.8)
      .length,
    color: "#FFD92D",
  });

  chartData.push({
    id: "Alto",
    value: data.filter((x) => x.scoreDiabetes! >= 0.8).length,
    color: "#F87171",
  });

  const options: Omit<PieSvgProps<DataType>, "width" | "height"> = {
    data: chartData,
  };

  return <Chart.Pie {...options} />;
}
