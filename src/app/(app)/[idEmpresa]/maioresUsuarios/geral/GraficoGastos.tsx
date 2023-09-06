"use client";

import { Chart } from "@/components";
import { BarSvgProps } from "@nivo/bar";
import { Evento } from "@prisma/client";
import { format } from "date-fns";

type DataType = {
  Date: string;
  Sinistro: number;
  SinistroColor: string;
};

const labels = ["Sinistro"];

export function GraficoGastos({ data }: { data: Evento[] }) {
  const competencias = [
    ...new Set(data.map((x) => format(x.dataPagamento!, "MM/yyyy"))),
  ];

  if (competencias.length > 12) {
    competencias.splice(0, competencias.length - 12);
  }

  const chartData: DataType[] = competencias.map((comp) => {
    return {
      Date: comp,
      Sinistro: data
        .filter((x) => format(x.dataPagamento!, "MM/yyyy") === comp)
        .reduce((sum, current) => sum + current.sinistro, 0),
      SinistroColor: "#F87171",
    };
  });

  const options: Omit<BarSvgProps<DataType>, "width" | "height"> = {
    keys: labels,
    indexBy: "Date",
    groupMode: "grouped",
    data: chartData,
    label: "",
    axisLeft: {
      tickValues: 4,
      format: (value: number) =>
        `R$ ${value.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
        })}`,
    },
    valueFormat: (value: any) =>
      `R$ ${value.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
      })}`,
  };

  return <Chart.Bar {...options} />;
}
