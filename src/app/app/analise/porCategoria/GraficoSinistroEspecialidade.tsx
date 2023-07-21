"use client";

import { Chart } from "@/components";
import { CenteredMoneyMetric } from "@/lib/util/charts/pie";
import { PieSvgProps } from "@nivo/pie";
import { Evento, Prisma } from "@prisma/client";

type EspecialidadeWithExamesEventos = Prisma.EspecialidadeGetPayload<{
  include: { exames: { include: { eventos: true } } };
}>;

type DataType = {
  id: string;
  value: number;
  items: Evento[];
};

export function GraficoSinistroEspecialidade({
  data,
}: {
  data: EspecialidadeWithExamesEventos[];
}) {
  const chartData: DataType[] = [];

  for (const especialidade of data) {
    const eventos = especialidade.exames.reduce<Evento[]>(
      (listaEventos, exame) => [...listaEventos, ...exame.eventos],
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
    colors: { scheme: "set2" },
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
