"use client";

import { Chart } from "@/components";
import { PieSvgProps } from "@nivo/pie";
import { Evento, Prisma } from "@prisma/client";
import { colorSchemes } from "@nivo/colors";
import { CenteredMoneyMetric } from "@/lib/util/charts/pie";

const customColors: string[] = [...colorSchemes.set2, "#b26dbc", "#f75b5b"];

type EspecialidadeWithProcedimentosEventos = Prisma.EspecialidadeGetPayload<{
  include: { procedimentos: { include: { eventos: true } } };
}>;

type DataType = {
  id: string;
  value: number;
  items: Evento[];
};

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
    margin: { top: 10, right: 230, bottom: 10, left: 10 },
    valueFormat: (value: number) =>
      `R$ ${value.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    layers: ["arcs", "legends", CenteredMoneyMetric],
    legends: [
      {
        anchor: "right",
        direction: "column",
        justify: false,
        translateX: 120,
        translateY: 0,
        itemsSpacing: 2,
        itemWidth: 100,
        itemHeight: 18,
        itemTextColor: "#999",
        itemDirection: "left-to-right",
        itemOpacity: 1,
        symbolSize: 18,
        symbolShape: "circle",
        effects: [
          {
            on: "hover",
            style: {
              itemTextColor: "#000",
            },
          },
        ],
        data: chartData.map((cur, index) => ({
          id: cur.id,
          label: cur.id.substring(0, 25) + (cur.id.length > 25 ? "..." : ""),
          color: customColors[index],
        })),
      },
    ],
  };

  return <Chart.Pie {...options} />;
}
