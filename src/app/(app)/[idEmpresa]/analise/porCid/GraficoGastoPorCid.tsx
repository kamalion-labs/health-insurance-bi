"use client";

import { Chart } from "@/components";
import { BarSvgProps } from "@nivo/bar";
import { Prisma } from "@prisma/client";

type EventoWithCids = Prisma.EventoGetPayload<{
  include: { CID: true };
}>;

type DataType = {
  Cid: string;
  Sinistro: number;
  SinistroColor: string;
};

const labels = ["Sinistro"];

export function GraficoGastoPorCid({ data }: { data: EventoWithCids[] }) {
  const cids = [...new Set(data.map((evento) => evento.codigoCID))];
  const nomeCids = [...new Set(data.map((evento) => evento.CID.descricao))];

  let chartData: DataType[] = cids.map((cid, i) => {
    return {
      Cid: nomeCids[i]!,
      Sinistro: data
        .filter((x) => x.codigoCID === cid)
        .reduce((sum, evento) => sum + evento.sinistro, 0),
      SinistroColor: "#52CD9F",
    };
  });

  chartData = chartData.sort((a, b) => b.Sinistro - a.Sinistro);

  const tresPrimeiros = chartData.splice(0, 3);

  const somaOutros = chartData.reduce(
    (sum, current) => sum + current.Sinistro,
    0
  );

  tresPrimeiros.push({
    Cid: "Outros",
    Sinistro: somaOutros,
    SinistroColor: "#52CD9F",
  });

  const options: Omit<BarSvgProps<DataType>, "width" | "height"> = {
    keys: labels,
    indexBy: "Cid",
    groupMode: "grouped",
    data: tresPrimeiros,
    label: "",
    margin: { top: 10, right: 150, bottom: 130, left: 120 },
    axisBottom: {
      tickRotation: -45,
    },
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
