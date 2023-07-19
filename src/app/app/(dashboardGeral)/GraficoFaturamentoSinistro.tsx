"use client";

import { Chart } from "@/components";
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

  const options = {
    keys: labels,
    indexBy: "Date",
    groupMode: "grouped",
    data: chartData,
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
