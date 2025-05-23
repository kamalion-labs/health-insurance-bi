"use client";

import { Chart } from "@/components";
import { BarSvgProps } from "@nivo/bar";
import { Prisma } from "@prisma/client";
import { format } from "date-fns";

type EventoWithProcedimentos = Prisma.EventoGetPayload<{
  include: { procedimento: true };
}>;

type DataType = {
  Date: string;
  Quantidade: number;
  QuantidadeColor: string;
};

const labels = ["Quantidade"];

export function GraficoExamesPorCompetencia({
  data,
}: {
  data: EventoWithProcedimentos[];
}) {
  const competencias = [
    ...new Set(data.map((x) => format(x.dataRealizacao!, "MM/yyyy"))),
  ];

  const chartData: DataType[] = [];

  competencias.forEach((comp) => {
    const eventosCompetencia = data.filter(
      (x) => format(x.dataRealizacao!, "MM/yyyy") === comp
    );
    if (eventosCompetencia.length !== 0) {
      chartData.push({
        Date: comp,
        Quantidade: eventosCompetencia.length,
        QuantidadeColor: "#52CD9F",
      });
    }
  });

  const options: Omit<BarSvgProps<DataType>, "width" | "height"> = {
    keys: labels,
    indexBy: "Date",
    groupMode: "grouped",
    data: chartData,
    label: "",
  };

  return <Chart.Bar {...options} />;
}
