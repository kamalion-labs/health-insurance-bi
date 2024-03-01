"use client";

import { Chart } from "@/components";
import { PessoaWithEventosCategoriaPlanoTipoTitularidade } from "./page";
import { PieSvgProps } from "@nivo/pie";
import { CenteredMoneyMetric } from "@/lib/util/charts/pie";

interface DataType {
  id: string | unknown;
  value: number;
}

export function GraficoCID({
  data,
}: {
  data: PessoaWithEventosCategoriaPlanoTipoTitularidade;
}) {
  const chartData: DataType[] = [];

  const cids = [...new Set(data.eventos.map((x) => x.codigoCID!))];

  for (const cid of cids) {
    chartData.push({
      id: cid,
      value: data.eventos.reduce(
        (sum, current) =>
          current.codigoCID === cid ? sum + current.custoTotal : sum,
        0
      ),
    });
  }

  const options: Omit<PieSvgProps<DataType>, "width" | "height"> = {
    data: chartData,
    colors: { scheme: "set2" },
    enableArcLabels: false,
    enableArcLinkLabels: false,
    innerRadius: 0.7,
    margin: { top: 10, right: 130, bottom: 20, left: 0 },
    valueFormat: (value: number) =>
      `R$ ${value.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    layers: ["arcs", "legends", CenteredMoneyMetric],
  };

  return <Chart.Pie {...options} />;
}
