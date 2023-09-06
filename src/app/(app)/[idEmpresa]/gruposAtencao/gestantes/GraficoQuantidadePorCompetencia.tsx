"use client";

import { Chart } from "@/components";
import { BarTotalLayer } from "@/lib/util/charts/bars";
import { BarSvgProps } from "@nivo/bar";
import { Prisma } from "@prisma/client";
import { format } from "date-fns";

type EventosWithProcedimentoPessoa = Prisma.EventoGetPayload<{
  include: { procedimento: true; pessoa: true };
}>;

type DataType = {
  Quantidade: number;
  Competencia: string;
};

export function GraficoQuantidadePorCompetencia({
  data,
}: {
  data: EventosWithProcedimentoPessoa[];
}) {
  const labels = ["Quantidade"];

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
      Competencia: comp,
      Quantidade: eventosCompetencia.length,
    };

    return item;
  });

  const options: Omit<BarSvgProps<DataType>, "width" | "height"> = {
    keys: labels,
    groupMode: "grouped",
    indexBy: "Competencia",
    data: chartData,
    label: "",
    margin: { top: 40, right: 180, bottom: 30, left: 60 },
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
