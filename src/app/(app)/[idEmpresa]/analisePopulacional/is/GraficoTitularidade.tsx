import { Chart } from "@/components";
import { PieSvgProps } from "@nivo/pie";
import { Pessoa } from "@prisma/client";

type DataType = {
  id: string;
  value: number;
  color: string;
};

export function GraficoTitularidade({ data }: { data: Pessoa[] }) {
  const chartData: DataType[] = [];

  chartData.push({
    id: "Titular",
    value: data.filter((x) => x.idTipoTitularidade === 1).length,
    color: "#5B93FF",
  });

  chartData.push({
    id: "Dependente",
    value: data.filter((x) => x.idTipoTitularidade !== 1).length,
    color: "#52CD9F",
  });

  const options: Omit<PieSvgProps<DataType>, "width" | "height"> = {
    data: chartData,
  };

  return <Chart.Pie {...options} />;
}
