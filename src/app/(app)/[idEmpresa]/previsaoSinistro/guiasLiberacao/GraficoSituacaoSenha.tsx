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

export function GraficoSituacaoSenha({
  data,
}: {
  data: LiberacaoWithPrestadorEvento[];
}) {
  const chartData: DataType[] = [];

  chartData.push({
    id: "Liberada",
    value: data.filter((liberacao) => liberacao.situacaoSenha === "LIBERADA")
      .length,
    color: "#5B93FF",
  });

  chartData.push({
    id: "Negada",
    value: data.filter((liberacao) => liberacao.situacaoSenha === "NEGADA")
      .length,
    color: "#F87171",
  });

  const options: Omit<PieSvgProps<DataType>, "width" | "height"> = {
    data: chartData,
  };

  return <Chart.Pie {...options} />;
}
