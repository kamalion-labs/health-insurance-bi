"use client";

import { Chart } from "@/components";
import { BarSvgProps } from "@nivo/bar";
import { Prisma } from "@prisma/client";

type EventoWithProcedimento = Prisma.EventoGetPayload<{
  include: { procedimento: true };
}>;

type DataType = {
  Risco: string;
  Quantidade: number;
  QuantidadeColor: string;
};

export function GraficoRisco({ data }: { data: EventoWithProcedimento[] }) {
  const chartData: DataType[] = [];

  console.log(data);

  chartData.push({
    Risco: "Baixo",
    Quantidade: data.filter((evento) => evento.risco === "BAIXO").length,
    QuantidadeColor: "#5B93FF",
  });

  chartData.push({
    Risco: "Médio",
    Quantidade: data.filter((evento) => evento.risco === "MEDIO").length,
    QuantidadeColor: "#FFD92D",
  });

  chartData.push({
    Risco: "Alto",
    Quantidade: data.filter((evento) => evento.risco === "ALTO").length,
    QuantidadeColor: "#F87171",
  });

  const options: Omit<BarSvgProps<DataType>, "width" | "height"> = {
    indexBy: "Risco",
    groupMode: "grouped",
    data: chartData,
    margin: { top: 10, right: 150, bottom: 40, left: 120 },
    axisBottom: {
      tickRotation: -45,
    },
    label: "",
  };

  return <Chart.Bar {...options} keys={["Quantidade"]} />;
}
