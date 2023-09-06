"use client";

import { Chart } from "@/components";
import { CenteredMoneyMetric } from "@/lib/util/charts/pie";
import { colorSchemes } from "@nivo/colors";
import { PieSvgProps } from "@nivo/pie";
import { Evento, Prisma } from "@prisma/client";

type EspecialidadeWithProcedimentosEventos = Prisma.EspecialidadeGetPayload<{
  include: { procedimentos: { include: { eventos: true } } };
}>;

type DataType = {
  id: string;
  value: number;
  items: Evento[];
};

const customColors: string[] = [...colorSchemes.set2, "#b26dbc", "#f75b5b"];

export function GraficoSinistroEspecialidade({
  data,
}: {
  data: EspecialidadeWithProcedimentosEventos[];
}) {
  const chartData: DataType[] = [];

  for (const especialidade of data) {
    const eventos = especialidade.procedimentos.reduce<Evento[]>(
      (listaEventos, procedimento) => [
        ...listaEventos,
        ...procedimento.eventos,
      ],
      []
    );

    chartData.push({
      id: especialidade.nome,
      value: eventos.reduce((sum, evento) => sum + evento.sinistro, 0),
      items: eventos,
    });
  }

  const options: Omit<PieSvgProps<DataType>, "width" | "height"> = {
    data: chartData,
    colors: customColors,
    enableArcLabels: false,
    enableArcLinkLabels: false,
    innerRadius: 0.7,
    margin: { top: 10, right: 150, bottom: 20, left: 0 },
    valueFormat: (value: number) =>
      `R$ ${value.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    layers: ["arcs", "legends", CenteredMoneyMetric],
  };

  return <Chart.Pie {...options} />;
}
