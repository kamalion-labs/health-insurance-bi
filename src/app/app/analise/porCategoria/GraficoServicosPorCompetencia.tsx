"use client";

import { Chart } from "@/components";
import { BarSvgProps } from "@nivo/bar";
import { Categoria, Prisma } from "@prisma/client";
import { format } from "date-fns";

type EventosWithCategorias = Prisma.EventoGetPayload<{
  include: { exame: { include: { categoria: true } } };
}>;

type DataType = {
  [c: string]: number | string;
  Date: string;
};

const BarTotalsLayer = (props: any) => {
  const labelOffset = 10;
  const labelFontSize = 12;

  if (props.bars.length === 0) return null;

  // compute totals for each index/bar
  const totals: any = {};
  const bandwidth = props.bars[0].width;
  props.bars.forEach((bar: any) => {
    const indexValue = bar.data.indexValue;
    if (!(indexValue in totals)) {
      totals[indexValue] = 0;
    }

    if (!bar.data.hidden) {
      totals[indexValue] += bar.data.value;
    }
  });

  // place text elements above the bars
  const labels = Object.keys(totals).map((indexValue) => {
    const x = props.xScale(indexValue) + bandwidth / 2;
    const y = props.yScale(totals[indexValue]) - labelOffset;
    return (
      <text
        key={"total." + indexValue}
        x={x}
        y={y}
        textAnchor={"middle"}
        fontWeight={"bold"}
        fontSize={labelFontSize}
      >
        {totals[indexValue]}
      </text>
    );
  });
  return <>{labels}</>;
};

export function GraficoServicosPorCompetencia({
  data,
  categorias,
}: {
  data: EventosWithCategorias[];
  categorias: Categoria[];
}) {
  const labels = categorias.map((cat) => cat.nome);

  const competencias = [
    ...new Set(data.map((x) => format(x.dataPagamento!, "MM/yyyy"))),
  ];

  const chartData: DataType[] = competencias.map((comp) => {
    const eventosCompetencia = data.filter(
      (x) => format(x.dataPagamento!, "MM/yyyy") === comp
    );

    const item: DataType = {
      Date: comp,
    };

    categorias.forEach((cat) => {
      item[cat.nome] = eventosCompetencia.filter(
        (x) => x.exame.idCategoria === cat.id
      ).length;
    });

    return item;
  });

  const options: Omit<BarSvgProps<DataType>, "width" | "height"> = {
    keys: labels,
    indexBy: "Date",
    data: chartData,
    margin: { top: 40, right: 230, bottom: 30, left: 60 },
    axisLeft: {
      tickValues: 4,
    },
    colors: { scheme: "set2" },

    layers: [
      "grid",
      "axes",
      "markers",
      "bars",
      "legends",
      "annotations",
      BarTotalsLayer,
    ],
  };

  return <Chart.Bar {...options} />;
}
