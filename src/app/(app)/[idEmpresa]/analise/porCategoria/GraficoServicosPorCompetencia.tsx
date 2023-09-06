"use client";

import { Chart } from "@/components";
import { BarTotalLayer } from "@/lib/util/charts/bars";
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

export function GraficoServicosPorCompetencia({
  data,
  categorias,
}: {
  data: EventosWithCategorias[];
  categorias: Categoria[];
}) {
  const labels = categorias.map((cat) => cat.nome);

  const competencias = [
    ...new Set(data.map((x) => format(x.dataRealizacao!, "MM/yyyy"))),
  ];

  if (competencias.length > 12) {
    competencias.splice(0, competencias.length - 12);
  }

  const chartData: DataType[] = competencias.map((comp) => {
    const eventosCompetencia = data.filter(
      (x) => format(x.dataRealizacao!, "MM/yyyy") === comp
    );

    const item: DataType = {
      Date: comp,
    };

    categorias.forEach((cat) => {
      item[cat.nome] = eventosCompetencia.filter(
        (x) => x.procedimento.idCategoria === cat.id
      ).length;
    });

    return item;
  });

  const options: Omit<BarSvgProps<DataType>, "width" | "height"> = {
    keys: labels,
    indexBy: "Date",
    data: chartData,
    label: "",
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
      BarTotalLayer,
    ],
  };

  return <Chart.Bar {...options} />;
}
