"use client";

import { Chart } from "@/components";
import { PessoaWithEventosCategoriaPlanoTipoTitularidade } from "./page";
import { PieSvgProps } from "@nivo/pie";
import { CenteredMoneyMetric } from "@/lib/util/charts/pie";

interface DataType {
  id: string;
  value: number;
}

export function GraficoCustosFamiliares({
  data,
}: {
  data: PessoaWithEventosCategoriaPlanoTipoTitularidade;
}) {
  const chartData: DataType[] = [];

  const dependentes = [...new Set(data.dependentes.map((x) => x.nome))];

  for (const dependente of dependentes) {
    chartData.push({
      id: dependente,
      value: data.dependentes
        .find((x) => x.nome === dependente)!
        .eventos.reduce((sum, current) => sum + current.custoTotal, 0),
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
