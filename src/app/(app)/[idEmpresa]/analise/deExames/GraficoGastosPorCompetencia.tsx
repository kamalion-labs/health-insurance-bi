"use client";

import { Chart } from "@/components";
import { BarSvgProps } from "@nivo/bar";
import { Prisma } from "@prisma/client";
import { format } from "date-fns";

type EventoWithProcedimentoCategoriaEspecialidade = Prisma.EventoGetPayload<{
  include: { procedimento: { include: { categoria: true } } };
}>;

type DataType = {
  Date: string;
  Faturamento: number;
  FaturamentoColor: string;
};

const labels = ["Faturamento"];

export function GraficoGastosPorCompetencia({
  data,
}: {
  data: EventoWithProcedimentoCategoriaEspecialidade[];
}) {
  const competencias = [
    ...new Set(data.map((x) => format(x.dataRealizacao, "MM/yyyy"))),
  ];

  const chartData: DataType[] = [];

  competencias.forEach((comp) => {
    const eventosCompetencia = data.filter(
      (x) => format(x.dataRealizacao, "MM/yyyy") === comp
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
