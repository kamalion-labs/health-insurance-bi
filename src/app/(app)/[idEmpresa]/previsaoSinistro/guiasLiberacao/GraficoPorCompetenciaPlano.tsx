"use client";

import { Chart } from "@/components";
import { BarTotalLayer } from "@/lib/util/charts/bars";
import { BarSvgProps } from "@nivo/bar";
import { Plano, Prisma } from "@prisma/client";
import { format } from "date-fns";

type DataType = {
  [c: string]: number | string;
  Date: string;
};

type LiberacaoWithPlanoPrestadorEvento = Prisma.LiberacaoGetPayload<{
  include: { prestador: { include: { eventos: true } }; plano: true };
}>;

export function GraficoPorCompetenciaPlano({
  data,
  planos,
}: {
  data: LiberacaoWithPlanoPrestadorEvento[];
  planos: Plano[];
}) {
  const labels = planos.map((plano) => plano.nome);

  const competencias = [
    ...new Set(data.map((lib) => format(lib.dataSolicitacao!, "MM/yyyy"))),
  ];

  const chartData: DataType[] = competencias.map((comp) => {
    const liberacoesCompetencia = data.filter(
      (liberacao) => format(liberacao.dataSolicitacao!, "MM/yyyy") === comp
    );

    const item: DataType = {
      Date: comp,
    };

    planos.forEach((plano) => {
      item[plano.nome] = liberacoesCompetencia.filter(
        (lib) => lib.prestador.id === plano.id
      ).length;
    });

    return item;
  });

  const options: Omit<BarSvgProps<DataType>, "width" | "height"> = {
    keys: labels,
    indexBy: "Date",
    data: chartData,
    label: "",
    margin: { top: 40, right: 230, bottom: 30, left: 60 },
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
