"use client";

import { Chart } from "@/components";
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

const CenteredMetric = ({ dataWithArc, centerX, centerY }: any) => {
  let total = 0;
  dataWithArc.forEach((datum: any) => {
    total += datum.value;
  });

  return (
    <g x={centerX} y={centerY} dominantBaseline="central">
      <text
        x={centerX}
        y={centerY - 10}
        textAnchor="middle"
        style={{
          fontSize: "20px",
          fontWeight: 600,
        }}
      >
        R${" "}
        {total.toLocaleString("pt-Br", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </text>

      <text
        x={centerX}
        y={centerY + 10}
        textAnchor="middle"
        style={{
          fontSize: "16px",
        }}
      >
        Total
      </text>
    </g>
  );
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
    layers: ["arcs", "legends", CenteredMetric],
  };

  return <Chart.Pie {...options} />;
}
