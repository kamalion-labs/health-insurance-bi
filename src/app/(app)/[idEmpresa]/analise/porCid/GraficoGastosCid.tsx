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
  const cids = [...new Set(data.map((evento) => evento.codigoCID))];
  const nomeCids = [...new Set(data.map((evento) => evento.CID?.descricao))];

  const chartData: DataType[] = cids.map((cid, i) => {
    return {
      id: nomeCids[i]!,
      value: data
        .filter((evento) => evento.codigoCID === cid)
        .reduce((sum, evento) => sum + evento.sinistro, 0),
    };
  });

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
