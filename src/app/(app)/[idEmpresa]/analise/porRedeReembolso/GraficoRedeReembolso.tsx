"use client";

import { Chart } from "@/components";
import { CenteredMoneyMetric } from "@/lib/util/charts/pie";
import { PieSvgProps } from "@nivo/pie";
import { Evento } from "@prisma/client";

interface DataType {
  id: string;
  value: number;
}

export function GraficoRedeReembolso({ data }: { data: Evento[] }) {
  const chartData: DataType[] = [
    {
      id: "Rede",
      value: data.reduce(
        (sum, current) => (!current.reembolso ? sum + current.custoTotal : sum),
        0
      ),
    },
    {
      id: "Reembolso",
      value: data.reduce(
        (sum, current) => (current.reembolso ? sum + current.custoTotal : sum),
        0
      ),
    },
  ];

  const options: Omit<PieSvgProps<DataType>, "width" | "height"> = {
    data: chartData,
    colors: { scheme: "set2" },
    enableArcLabels: false,
    enableArcLinkLabels: false,
    innerRadius: 0.7,
    margin: { top: 10, right: 80, bottom: 20, left: 0 },
    valueFormat: (value: number) =>
      `R$ ${value.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    layers: ["arcs", "legends", CenteredMoneyMetric],
  };

  return <Chart.Pie {...options} />;
}
