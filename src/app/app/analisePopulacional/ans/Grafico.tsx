"use client";

import { Chart } from "@/components";

export function Grafico({ data, mediaANS }: { data: any; mediaANS: number }) {
  const options = {
    data,
    keys: ["Total"],
    indexBy: "Item",
    axisLeft: {
      tickValues: 4,
      format: (value: number) =>
        value.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
        }),
    },
    valueFormat: (value: any) =>
      value.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
      }),
    markers: [
      {
        axis: "y",
        value: mediaANS,
        lineStyle: { stroke: "#F87171", strokeWidth: 4 },
        legend: "Média ANS",
        legendOrientation: "vertical",
      },
    ],
    maxValue: (data[0].Total > mediaANS ? data[0].Total : mediaANS) + 5,
  };

  return <Chart.Bar {...options} />;
}
