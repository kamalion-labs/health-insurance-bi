"use client";

import { Chart } from "@/components";
import { BarTotalLayer } from "@/lib/util/charts/bars";
import { BarSvgProps } from "@nivo/bar";
import { Prisma } from "@prisma/client";

type ProcedimentoWithEventos = Prisma.ProcedimentoGetPayload<{
  include: { eventos: true };
}>;

type DataType = {
  Exame: string;
  Porcentagem: number;
};

const calculaPorcentagem = (total: number, quantidade: number) => {
  return (quantidade / total) * 100;
};

export function GraficoScreening({
  data,
}: {
  data: ProcedimentoWithEventos[];
}) {
  const labels = ["Porcentagem"];
  const chartData: DataType[] = [];

  let totalScreenings = 0;
  data.forEach((procedimento) => {
    totalScreenings += procedimento.eventos.length;
  });

  for (const item of data) {
    chartData.push({
      Exame: item.nome,
      Porcentagem: calculaPorcentagem(totalScreenings, item.eventos.length),
    });
  }

  const options: Omit<BarSvgProps<DataType>, "width" | "height"> = {
    keys: labels,
    indexBy: "Exame",
    groupMode: "grouped",
    data: chartData,
    legends: [],
    axisBottom: {
      tickRotation: -45,
    },
    axisLeft: {
      tickValues: 4,
      format: (value: number) =>
        `${value.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
        })}%`,
    },
    valueFormat: (value: any) =>
      `${value.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
      })}%`,
    margin: { top: 20, right: 40, bottom: 160, left: 60 },
    colors: { scheme: "set2" },
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
