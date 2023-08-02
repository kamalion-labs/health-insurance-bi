import { Chart } from "@/components";
import { PieSvgProps } from "@nivo/pie";
import { Pessoa } from "@prisma/client";

type DataType = {
  id: string;
  value: number;
  color: string;
};

export async function GraficoInternacoesPorSexo({ data }: { data: Pessoa[] }) {
  const chartData: DataType[] = [];

  chartData.push({
    id: "Masculino",
    value: data.filter((pessoa) => pessoa.sexo === "M").length,
    color: "#5B93FF",
  });

  chartData.push({
    id: "Feminino",
    value: data.filter((pessoa) => pessoa.sexo === "F").length,
    color: "#F87171",
  });

  chartData.push({
    id: "Não informado",
    value: data.filter((pessoa) => !pessoa.sexo).length,
    color: "#52CD9F",
  });

  const options: Omit<PieSvgProps<DataType>, "width" | "height"> = {
    data: chartData,
  };

  return <Chart.Pie {...options} />;
}
