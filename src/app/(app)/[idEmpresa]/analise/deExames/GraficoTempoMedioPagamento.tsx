"use client";

import { Card, Chart } from "@/components";
import { BarSvgProps } from "@nivo/bar";
import { Evento } from "@prisma/client";
import { differenceInDays, format } from "date-fns";

type DataType = {
  Date: string;
  Dias: number;
  DiasColor: string;
};

export function GraficoTempoMedioPagamento({ data }: { data: Evento[] }) {
  const competencias = [
    ...new Set(data.map((x) => format(x.dataPagamento!, "MM/yyyy"))),
  ];

  let totalDiferencaDias = 0;
  let totalEventos = 0;

  const chartData: DataType[] = competencias.map((comp) => {
    const eventosCompetencia = data.filter(
      (evento) => format(evento.dataPagamento!, "MM/yyyy") === comp
    );

    const totalDias = eventosCompetencia.reduce(
      (sum, evento) =>
        sum + differenceInDays(evento.dataPagamento!, evento.dataRealizacao),
      0
    );

    totalDiferencaDias += totalDias;
    totalEventos += eventosCompetencia.length;

    const item: DataType = {
      Date: comp,
      Dias: totalDias / eventosCompetencia.length,
      DiasColor: "#52CD9F",
    };

    return item;
  });

  const options: Omit<BarSvgProps<DataType>, "width" | "height"> = {
    keys: ["Dias"],
    indexBy: "Date",
    groupMode: "grouped",
    data: chartData,
    margin: { top: 10, right: 150, bottom: 40, left: 50 },
    axisLeft: {
      tickValues: 4,
      format: (value: number) =>
        `${value.toLocaleString("pt-BR", {
          minimumFractionDigits: 0,
        })} dias`,
    },
    valueFormat: (value: number) =>
      value.toLocaleString("pt-BR", { maximumFractionDigits: 2 }),
  };

  const tempoMedio = (totalDiferencaDias / totalEventos);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      <div className="flex items-center justify-center">
        <Card.Root className="flex w-[300px] flex-col items-center justify-center px-5 py-5">
          <Card.Value className="text-center text-2xl font-bold">
            {
              Math.abs(tempoMedio).toLocaleString("pt-BR", { maximumFractionDigits: 0 })
            }{" "} dias {" "}
            {
              tempoMedio < 0 ? "adiantados" : ""
            }
          </Card.Value>

          <Card.Title className="text-center">
            Tempo médio de pagamento
          </Card.Title>
        </Card.Root>
      </div>

      <div className="col-span-2 h-[350px]">
        <Chart.Bar {...options} />
      </div>
    </div>
  );
}
