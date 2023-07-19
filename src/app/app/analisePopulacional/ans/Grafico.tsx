"use client";

import { Chart } from "@/components";

export function Grafico({ data }: { data: any }) {
  const options = {
    data,
    keys: ["Total"],
    indexBy: "Item",
    markers: [
      {
        axis: "y",
        value: 16.9,
        lineStyle: { stroke: "#F87171", strokeWidth: 4 },
        legend: "Média ANS",
        legendOrientation: "vertical",
      },
    ],
    maxValue: 30,
  };

  return <Chart.Bar {...options} />;
}
