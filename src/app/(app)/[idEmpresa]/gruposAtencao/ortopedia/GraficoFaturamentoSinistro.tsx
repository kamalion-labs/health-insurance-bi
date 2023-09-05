"use client";

import { Chart } from "@/components";
import { BarSvgProps } from "@nivo/bar";
import { Evento } from "@prisma/client";
import { format } from "date-fns";

type DataType = {
  Date: string;
  Faturamento: number;
  FaturamentoColor: string;
  Sinistro: number;
  SinistroColor: string;
  Coparticipacao: number;
  CoparticipacaoColor: string;
};

const labels = ["Faturamento", "Sinistro", "Coparticipacao"];

export function GraficoFaturamentoSinistro({ data }: { data: Evento[] }) {
  const competencias = [
    ...new Set(data.map((x) => format(x.dataPagamento!, "MM/yyyy"))),
  ];

  const chartData: DataType[] = competencias.map((comp) => {
    const eventosCompetencia = data.filter(
      (x) => format(x.dataPagamento!, "MM/yyyy") === comp
    );

    return {
      Date: comp,
      Faturamento: eventosCompetencia.reduce(
        (sum, current) => sum + current.custoTotal,
        0
      ),
      Sinistro: eventosCompetencia.reduce(
        (sum, current) => sum + current.sinistro,
        0
      ),
      Coparticipacao: eventosCompetencia.reduce(
        (sum, current) => sum + current.coparticipacao,
        0
      ),

      SinistroColor: "#F87171",
      FaturamentoColor: "#52CD9F",
      CoparticipacaoColor: "#5B93FF",
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
    margin: { top: 10, right: 10, bottom: 80, left: 100 },
    legends: [
      {
        dataFrom: "keys",
        anchor: "bottom-left",
        direction: "row",
        justify: false,
        translateX: -80,
        translateY: 70,
        itemsSpacing: 2,
        itemWidth: 100,
        itemHeight: 20,
        itemDirection: "left-to-right",
        itemOpacity: 0.85,
        symbolSize: 20,
        symbolShape: "circle",
        effects: [
          {
            on: "hover",
            style: {
              itemOpacity: 1,
            },
          },
        ],
      },
    ],
  };

  return <Chart.Bar {...options} />;
}
