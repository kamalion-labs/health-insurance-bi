import { Chart } from "@/components";
import { BarSvgProps } from "@nivo/bar";
import { Evento, Prisma } from "@prisma/client";

type CategoriaWithExamesEventos = Prisma.CategoriaGetPayload<{
  include: { exames: { include: { eventos: true } } };
}>;

type DataType = {
  Categoria: string;
  Quantidade: number;
};

export function GraficoServicos({
  data,
}: {
  data: CategoriaWithExamesEventos[];
}) {
  const labels = ["Quantidade"];
  const chartData: DataType[] = [];

  for (const item of data) {
    const eventos = item.exames.reduce<Evento[]>(
      (lista, exame) => [...lista, ...exame.eventos],
      []
    );

    chartData.push({
      Categoria: item.nome,
      Quantidade: eventos.length,
    });
  }

  const options: Omit<BarSvgProps<DataType>, "width" | "height"> = {
    keys: labels,
    indexBy: "Categoria",
    groupMode: "grouped",
    data: chartData,
    legends: [],
    axisBottom: {
      tickRotation: -45,
    },
    margin: { top: 10, right: 130, bottom: 140, left: 120 },
    colors: { scheme: "set2" },
  };

  return <Chart.Bar {...options} />;
}
