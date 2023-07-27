import { Chart } from "@/components";
import { BarSvgProps } from "@nivo/bar";
import { Evento, Prisma } from "@prisma/client";

type CategoriaWithProcedimentosEventos = Prisma.CategoriaGetPayload<{
  include: { procedimentos: { include: { eventos: true } } };
}>;

type DataType = {
  Categoria: string;
  Quantidade: number;
};

export function GraficoServicos({
  data,
}: {
  data: CategoriaWithProcedimentosEventos[];
}) {
  const labels = ["Quantidade"];
  const chartData: DataType[] = [];

  for (const item of data) {
    const eventos = item.procedimentos.reduce<Evento[]>(
      (lista, procedimento) => [...lista, ...procedimento.eventos],
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
    axisLeft: {
      tickValues: 4,
    },
    margin: { top: 10, right: 40, bottom: 140, left: 40 },
    colors: { scheme: "set2" },
  };

  return <Chart.Bar {...options} />;
}
