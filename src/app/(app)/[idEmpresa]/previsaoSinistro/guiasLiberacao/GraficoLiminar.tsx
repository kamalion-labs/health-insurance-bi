"use client";

import { Chart } from "@/components";
import { PieSvgProps } from "@nivo/pie";
import { Prisma } from "@prisma/client";

type DataType = {
  id: string;
  value: number;
  color: string;
};

type LiberacaoWithPrestadorEvento = Prisma.LiberacaoGetPayload<{
  include: { prestador: { include: { eventos: true } } };
}>;

export function GraficoLiminar({
  data,
}: {
  data: LiberacaoWithPrestadorEvento[];
}) {
  const chartData: DataType[] = [];

  chartData.push({
    id: "Possui Liminar",
    value: data.filter((liberacao) => liberacao.possuiLiminar).length,
    color: "#F87171",
  });

  chartData.push({
    id: "Não Possui Liminar",
    value: data.filter((liberacao) => !liberacao.possuiLiminar).length,
    color: "#5B93FF",
  });

  const options: Omit<PieSvgProps<DataType>, "width" | "height"> = {
    data: chartData,
  };

  return <Chart.Pie {...options} />;
}
