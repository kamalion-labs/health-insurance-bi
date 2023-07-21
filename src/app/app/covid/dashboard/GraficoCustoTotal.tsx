"use client";

import { Chart } from "@/components";
import { CenteredMoneyMetric } from "@/lib/util/charts/pie";
import { PieSvgProps } from "@nivo/pie";
import { Evento, Prisma } from "@prisma/client";

type CidWithEventos = Prisma.CidGetPayload<{
  include: { eventos: true };
}>;

type DataType = {
  id: string;
  value: number;
  items: Evento[];
};

const cidsCovid = ["A00", "A01", "B50"];

export function GraficoCustoTotal({ data }: { data: CidWithEventos[] }) {
  const chartData: DataType[] = [];

  const eventosCovid = data
    .filter((cid) => cidsCovid.includes(cid.codigo))
    .reduce<Evento[]>(
      (listaEventos, cid) => [...listaEventos, ...cid.eventos],
      []
    );

  const eventosNaoCovid = data
    .filter((cid) => !cidsCovid.includes(cid.codigo))
    .reduce<Evento[]>(
      (listaEventos, cid) => [...listaEventos, ...cid.eventos],
      []
    );

  chartData.push({
    id: "Covid",
    value: eventosCovid.reduce((sum, evento) => sum + evento.custoTotal, 0),
    items: eventosCovid,
  });

  chartData.push({
    id: "Não Covid",
    value: eventosNaoCovid.reduce((sum, evento) => sum + evento.custoTotal, 0),
    items: eventosNaoCovid,
  });

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
    layers: ["arcs", "legends", CenteredMoneyMetric],
  };

  return <Chart.Pie {...options} />;
}
