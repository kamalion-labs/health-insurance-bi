"use client";

import { Chart } from "@/components";
import { BarTotalLayer } from "@/lib/util/charts/bars";
import { BarSvgProps } from "@nivo/bar";
import { Evento } from "@prisma/client";
import { format } from "date-fns";

type DataType = {
  Quantidade: number;
  Date: string;
};

const labels = ["Quantidade"];

export function GraficoServicosPorCompetencia({ data }: { data: Evento[] }) {
  const competencias = [
    ...new Set(data.map((x) => format(x.dataRealizacao!, "MM/yyyy"))),
  ];

  const chartData: DataType[] = competencias.map((comp) => {
    const eventosCompetencia = data.filter(
      (x) => format(x.dataRealizacao!, "MM/yyyy") === comp
    );

    const item: DataType = {
      Date: comp,
      Quantidade: eventosCompetencia.length,
    };

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
