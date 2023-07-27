"use client";

import { Chart } from "@/components";
import { CenteredMoneyMetric } from "@/lib/util/charts/pie";
import { PieSvgProps } from "@nivo/pie";
import { Evento, Prisma } from "@prisma/client";

type CategoriaWithProcedimentosEventos = Prisma.CategoriaGetPayload<{
  include: { procedimentos: { include: { eventos: true } } };
}>;

interface DataType {
  id: string;
  value: number;
}

export function GraficoGastosCategoria({
  data,
}: {
  data: CategoriaWithProcedimentosEventos[];
}) {
  const chartData: DataType[] = [];

  for (const item of data) {
    const eventos = item.procedimentos.reduce<Evento[]>(
      (lista, procedimento) => [...lista, ...procedimento.eventos],
      []
    );

    chartData.push({
      id: item.nome,
      value: eventos.reduce((sum, current) => sum + current.custoTotal, 0),
    });
  }

  const options: Omit<PieSvgProps<DataType>, "width" | "height"> = {
    data: chartData,
    colors: { scheme: "set2" },
    enableArcLabels: false,
    enableArcLinkLabels: false,
    innerRadius: 0.7,
    margin: { top: 10, right: 100, bottom: 20, left: 0 },
    valueFormat: (value: number) =>
      `R$ ${value.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    layers: ["arcs", "legends", CenteredMoneyMetric],
  };

  return <Chart.Pie {...options} />;
}
