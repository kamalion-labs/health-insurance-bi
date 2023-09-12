"use client";

import { Chart } from "@/components";
import { useFiltro } from "@/stores";
import { LineSvgProps } from "@nivo/line";
import { format } from "date-fns";
import { EventoWithChilds } from "./page";

type DataType = {
  id: string;
  color: string;
  data: { x: string; y: number }[];
};

const META = 70;

export function GraficoSinistralidadeTempo({ data }: { data: EventoWithChilds[] }) {
  const { idCategoria, dataInicio, dataFim } = useFiltro();

  if(idCategoria) {
    data = data.filter(x => x.procedimento.idCategoria === idCategoria);
  }

  if(dataInicio) {
    data = data.filter(x => x.dataRealizacao >= dataInicio);
  }

  if(dataFim) {
    data = data.filter(x => x.dataRealizacao <= dataFim);
  }
  
  const chartData: DataType[] = [
    {
      id: "Meta",
      color: "#5B93FF",
      data: [],
    },
    {
      id: "Sinistralidade",
      color: "#F87171",
      data: [],
    },
  ];

  const competencias = [
    ...new Set(data.map((x) => format(x.dataPagamento!, "MM/yyyy"))),
  ];

  chartData[0].data = competencias.map((comp) => {
    return { x: comp, y: META };
  });

  chartData[1].data = competencias.map((comp) => {
    const eventosCompetencia = data.filter(
      (x) => format(x.dataPagamento!, "MM/yyyy") === comp
    );

    const totalFaturamento = eventosCompetencia.reduce(
      (sum, current) => sum + current.custoTotal,
      0
    );
    const totalSinistro = eventosCompetencia.reduce(
      (sum, current) => sum + current.sinistro,
      0
    );

    return {
      x: comp,
      y: (totalSinistro * 100) / totalFaturamento,
    };
  });

  const options: LineSvgProps = {
    data: chartData,
    yScale: {
      type: "linear",
      min: "auto",
      max: "auto",
    },
    enableArea: true,
    axisLeft: {
      tickValues: 4,
      format: (value: number) =>
        `${value.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
        })}%`,
    },
    yFormat: (value: any) => {
      return `${value.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
      })}%`;
    },
  };

  return <Chart.Line {...options} />;
}
