"use client";

import { Chart } from "@/components";
import { cidsCovid } from "@/lib/consts";
import { CenteredMoneyMetric } from "@/lib/util/charts/pie";
import { PieSvgProps } from "@nivo/pie";
import { Evento, Prisma } from "@prisma/client";

type EventoWithCids = Prisma.EventoGetPayload<{
  include: { CID: true };
}>;

type DataType = {
  id: string;
  value: number;
  items: Evento[];
};

export function GraficoCustoTotal({ data }: { data: EventoWithCids[] }) {
  const chartData: DataType[] = [];

  const eventosCovid = data.filter((evento) =>
    cidsCovid.includes(evento.CID.codigo)
  );

  const eventosNaoCovid = data.filter(
    (evento) => !cidsCovid.includes(evento.CID.codigo)
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
