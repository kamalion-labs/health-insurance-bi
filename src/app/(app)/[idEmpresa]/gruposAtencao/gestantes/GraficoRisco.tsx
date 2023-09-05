"use client";

import { Chart } from "@/components";
import { PieSvgProps } from "@nivo/pie";
import { Prisma } from "@prisma/client";

type EventoWithProcedimentoPessoa = Prisma.EventoGetPayload<{
  include: { procedimento: true };
}>;

type DataType = {
  id: string;
  value: number;
  color: string;
};

export function GraficoRisco({
  data,
}: {
  data: EventoWithProcedimentoPessoa[];
}) {
  const chartData: DataType[] = [];

  chartData.push({
    id: "Baixo",
    value: data.filter((evento) => evento.risco === "BAIXO").length,
    color: "#5B93FF",
  });

  chartData.push({
    id: "Médio",
    value: data.filter((evento) => evento.risco === "MEDIO").length,
    color: "#FFD92D",
  });

  chartData.push({
    id: "Alto",
    value: data.filter((evento) => evento.risco === "ALTO").length,
    color: "#F87171",
  });

  const options: Omit<PieSvgProps<DataType>, "width" | "height"> = {
    data: chartData,
  };

  return <Chart.Pie {...options} />;
}
