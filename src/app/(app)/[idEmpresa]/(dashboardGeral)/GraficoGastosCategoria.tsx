"use client";

import { Chart } from "@/components";
import { CenteredMoneyMetric } from "@/lib/util/charts/pie";
import { PieSvgProps } from "@nivo/pie";
import { Evento, Prisma } from "@prisma/client";
import { colorSchemes } from "@nivo/colors";
import { useFiltro } from "@/stores";

const colors = colorSchemes.set2;

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
  const { idCategoria, dataInicio, dataFim } = useFiltro();

  if(idCategoria) {
    data = data.filter(x => x.id === idCategoria);
  }

  if(dataInicio) {
    data = data.filter(x => x.procedimentos.some(x2 => x2.eventos.some(x3 => x3.dataRealizacao >= dataInicio)));
  }

  if(dataFim) {
    data = data.filter(x => x.procedimentos.some(x2 => x2.eventos.some(x3 => x3.dataRealizacao <= dataFim)));
  }

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
          color: colors[index],
        })),
      },
    ],
  };

  return <Chart.Pie {...options} />;
}
