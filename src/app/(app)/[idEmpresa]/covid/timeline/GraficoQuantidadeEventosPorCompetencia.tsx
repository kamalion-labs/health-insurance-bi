"use client";

import { Chart } from "@/components";
import { Cids } from "@/lib/consts";
import { BarSvgProps } from "@nivo/bar";
import { Prisma } from "@prisma/client";
import { format } from "date-fns";

type EventoWithCids = Prisma.EventoGetPayload<{
  include: { CID: true };
}>;

type DataType = {
  Date: string;
  Quantidade: number;
  QuantidadeColor: string;
};

const labels = ["Quantidade"];

export function GraficoQuantidadeEventosPorCompetencia({
  data,
}: {
  data: EventoWithCids[];
}) {
  const competencias = [
    ...new Set(data.map((x) => format(x.dataPagamento!, "MM/yyyy"))),
  ];

  const eventosCovid = data.filter((evento) =>
    Cids.cidsCovid.includes(evento.CID?.codigo!)
  );

  const chartData: DataType[] = [];

  competencias.forEach((comp) => {
    const eventosCompetencia = eventosCovid.filter(
      (x) => format(x.dataPagamento!, "MM/yyyy") === comp
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
