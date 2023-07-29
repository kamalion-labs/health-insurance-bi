"use client";

import { Chart } from "@/components";
import { Cids } from "@/lib/consts";
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

export function GraficoGastosGrupoCid({ data }: { data: EventoWithCids[] }) {
  const chartData: DataType[] = [];

  const gruposCid: { [codigoCid: string]: string } = {
    ...Object.fromEntries(
      Object.entries(Cids).flatMap(([grupo, cidsDoGrupo]) =>
        cidsDoGrupo.map((codigoCid) => [codigoCid, grupo])
      )
    ),
  };

  // for (const grupo in Cids) {
  //   Cids[grupo].forEach((codigoCid) => {
  //     gruposCid[codigoCid] = grupo;
  //   });
  // }

  console.log({ gruposCid, Cids });

  const somaPorGrupoCid: { [grupo: string]: number } = {};

  for (const evento of data) {
    const codigoCid = evento.CID?.codigo!;

    const grupoCid = gruposCid[codigoCid];

    if (somaPorGrupoCid.hasOwnProperty(grupoCid)) {
      somaPorGrupoCid[grupoCid] += evento.custoTotal;
    } else {
      somaPorGrupoCid[grupoCid] = evento.custoTotal;
    }
  }

  for (const grupo in somaPorGrupoCid) {
    if (somaPorGrupoCid.hasOwnProperty(grupo)) {
      chartData.push({
        id: grupo,
        value: somaPorGrupoCid[grupo],
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
