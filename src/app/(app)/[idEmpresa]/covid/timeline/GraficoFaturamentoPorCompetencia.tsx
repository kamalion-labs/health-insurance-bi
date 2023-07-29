"use client";

import { Chart } from "@/components";
import { Cids } from "@/lib/consts";
import { BarSvgProps } from "@nivo/bar";
import { Prisma } from "@prisma/client";
import { format } from "date-fns";

type EventoWithCids = Prisma.EventoGetPayload<{
  include: { CID: true };
}>;

type DataType = {
  Date: string;
  Faturamento: number;
  FaturamentoColor: string;
};

const labels = ["Faturamento"];

export function GraficoFaturamentoPorCompetencia({
  data,
}: {
  data: EventoWithCids[];
}) {
  const competencias = [
    ...new Set(data.map((x) => format(x.dataPagamento!, "MM/yyyy"))),
  ];

  const eventosCovid = data.filter((evento) =>
    Cids.cidsCovid.includes(evento.CID?.codigo!)
  );

  const chartData: DataType[] = [];

  competencias.forEach((comp) => {
    const eventosCompetencia = eventosCovid.filter(
      (x) => format(x.dataPagamento!, "MM/yyyy") === comp
    );

    if (eventosCompetencia.length !== 0) {
      chartData.push({
        Date: comp,
        FaturamentoColor: "#5B93FF",
        Faturamento: eventosCompetencia.reduce(
          (sum, evento) => sum + evento.custoTotal,
          0
        ),
      });
    }
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
