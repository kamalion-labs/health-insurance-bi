import { Chart } from "@/components";
import { Evento } from "@prisma/client";

type DataType = {
  id: string;
  color: string;
  data: { x: string; y: number }[];
};

const labels = ["Meta", "Sinistro Total"];

const META = 70;

export function GraficoSinistralidadeTempo({ data }: { data: Evento[] }) {
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

  chartData[0].data = data.reduce<{ x: string; y: number }[]>(
    (previous, current) => {
      let date = new Date(current.dataPagamento!);
      date = new Date(date.getFullYear(), date.getMonth(), 1);

      let competencia = previous.find((x) => x.x === date.toISOString())!;

      if (competencia) {
        previous.splice(previous.indexOf(competencia), 1, {
          ...competencia,
          y: META,
        });
      } else {
        competencia = {
          x: date.toISOString(),
          y: META,
        };

        previous.push(competencia);
      }

      return previous;
    },
    []
  );

  chartData[1].data = data.reduce<{ x: string; y: number }[]>(
    (previous, current) => {
      let date = new Date(current.dataPagamento!);
      date = new Date(date.getFullYear(), date.getMonth(), 1);

      let competencia = previous.find((x) => x.x === date.toISOString())!;

      if (competencia) {
        previous.splice(previous.indexOf(competencia), 1, {
          ...competencia,
          y: (Number(current.sinistro) * 100) / Number(current.custoTotal),
        });
      } else {
        competencia = {
          x: date.toISOString(),
          y: (Number(current.sinistro) * 100) / Number(current.custoTotal),
        };

        previous.push(competencia);
      }

      return previous;
    },
    []
  );

  const options = {
    keys: labels,
    indexBy: "Date",
    data: chartData,
    xScale: {
      format: "%Y-%m-%dT%H:%M:%S.%L%Z",
      type: "time",
      precision: "month",
      useUTC: false,
    },
    xFormat: "time:%m/%Y",
    axisBottom: {
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      format: "%m/%Y",
      legendOffset: 36,
      legendPosition: "middle",
      tickValues: "every 1 month",
    },
    yScale: {
      type: "linear",
      min: "auto",
      max: "auto",
    },
  };

  return <Chart.Line {...options} />;
}
