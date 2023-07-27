"use client";

import { Chart } from "@/components";
import { CenteredMoneyMetric } from "@/lib/util/charts/pie";
import { PieSvgProps } from "@nivo/pie";
import { Prisma } from "@prisma/client";

type EventoWithCids = Prisma.EventoGetPayload<{
  include: { CID: true };
}>;

interface DataType {
  id: string;
  value: number;
}

export function GraficoGastosCid({ data }: { data: EventoWithCids[] }) {
  const chartData: DataType[] = [];

  const somaPorTipoCid: { [tipoCid: string]: number } = {};

  for (const evento of data) {
    const tipoCid = evento.CID.codigo;

    if (somaPorTipoCid.hasOwnProperty(tipoCid)) {
      somaPorTipoCid[tipoCid] += evento.custoTotal;
    } else {
      somaPorTipoCid[tipoCid] = evento.custoTotal;
    }
  }

  for (const cid in somaPorTipoCid) {
    if (somaPorTipoCid.hasOwnProperty(cid)) {
      chartData.push({
        id: cid,
        value: somaPorTipoCid[cid],
      });
    }
  }

  const options: Omit<PieSvgProps<DataType>, "width" | "height"> = {
    data: chartData,
    colors: { scheme: "set2" },
    enableArcLabels: false,
    enableArcLinkLabels: false,
    innerRadius: 0.7,
    margin: { top: 10, right: 100, bottom: 20, left: 0 },
    valueFormat: (value: number) =>
      `R$ ${value.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    layers: ["arcs", "legends", CenteredMoneyMetric],
  };

  return <Chart.Pie {...options} />;
}
