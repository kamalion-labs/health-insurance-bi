"use client";

import { Chart } from "@/components";
import { BarTotalMoneyLayer } from "@/lib/util/charts/bars";
import { BarSvgProps } from "@nivo/bar";
import { Prisma } from "@prisma/client";
import { format } from "date-fns";

type EventosWithProcedimentoPessoa = Prisma.EventoGetPayload<{
  include: { procedimento: true; pessoa: true };
}>;

type DataType = {
  Competencia: string;
  Valor: number;
};

export function GraficoGastosPorCompetencia({
  data,
}: {
  data: EventosWithProcedimentoPessoa[];
}) {
  const labels = ["Valor"];

  const competencias = [
    ...new Set(data.map((x) => format(x.dataRealizacao!, "MM/yyyy"))),
  ];

  const chartData: DataType[] = competencias.map((comp) => {
    const eventosCompetencia = data.filter(
      (x) => format(x.dataRealizacao!, "MM/yyyy") === comp
    );

    const item: DataType = {
      Competencia: comp,
      Valor: eventosCompetencia.reduce(
        (sum, curr) => sum + curr.custoTotal * curr.quantidade,
        0
      ),
    };

    return item;
  });

  const options: Omit<BarSvgProps<DataType>, "width" | "height"> = {
    keys: labels,
    indexBy: "Competencia",
    data: chartData,
    label: "",
    margin: { top: 40, right: 180, bottom: 30, left: 120 },
    axisLeft: {
      tickValues: 4,
      format: (value: number) =>
        `R$ ${value.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
    },
    valueFormat: (value: any) =>
      `R$ ${value.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    colors: { scheme: "set2" },

    layers: [
      "grid",
      "axes",
      "markers",
      "bars",
      "legends",
      "annotations",
      BarTotalMoneyLayer,
    ],
  };

  return <Chart.Bar {...options} />;
}
