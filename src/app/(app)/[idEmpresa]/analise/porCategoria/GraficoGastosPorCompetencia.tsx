"use client";

import { Chart } from "@/components";
import { BarTotalMoneyLayer } from "@/lib/util/charts/bars";
import { BarSvgProps } from "@nivo/bar";
import { Categoria, Prisma } from "@prisma/client";
import { format } from "date-fns";

type EventosWithCategorias = Prisma.EventoGetPayload<{
  include: { procedimento: { include: { categoria: true } } };
}>;

type DataType = {
  [c: string]: number | string;
  Date: string;
};

export function GraficoGastosPorCompetencia({
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
      item[cat.nome] = eventosCompetencia
        .filter((x) => x.procedimento.idCategoria === cat.id)
        .reduce((sum, current) => sum + current.custoTotal, 0);
    });

    return item;
  });

  const options: Omit<BarSvgProps<DataType>, "width" | "height"> = {
    keys: labels,
    indexBy: "Date",
    data: chartData,
    label: "",
    margin: { top: 40, right: 230, bottom: 30, left: 120 },
    axisLeft: {
      tickValues: 4,
      format: (value: number) =>
        `R$ ${value.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
        })}`,
    },
    valueFormat: (value: any) =>
      `R$ ${value.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
      })}`,
    colors: { scheme: "set2" },

    layers: [
      "grid",
      "axes",
      "markers",
      "bars",
      "legends",
      "annotations",
      BarTotalMoneyLayer,
    ],
  };

  return <Chart.Bar {...options} />;
}
