import { Chart } from "@/components";
import { EventoWithPessoa } from "@/lib/evento/repositorio/EventoRepositorio";
import { format } from "date-fns";

type DataType = {
  Date: string;
  Titulares: number;
  TitularesColor: string;
  Dependentes: number;
  DependentesColor: string;
};

const labels = ["Titulares", "Dependentes"];

export function GraficoUsuariosMes({ data }: { data: EventoWithPessoa[] }) {
  const competencias = [
    ...new Set(data.map((x) => format(x?.dataPagamento!, "MM/yyyy"))),
  ];

  const chartData = competencias.map<DataType>((comp) => ({
    Date: comp,
    Titulares: data.filter(
      (x) =>
        (format(x?.dataPagamento!, "MM/yyyy") === comp &&
          x?.pessoa.idTipoTitularidade) === 1
    ).length,
    Dependentes: data.filter(
      (x) =>
        format(x?.dataPagamento!, "MM/yyyy") === comp &&
        x?.pessoa.idTipoTitularidade !== 1
    ).length,

    TitularesColor: "#52CD9F",
    DependentesColor: "#5B93FF",
  }));

  const options = {
    keys: labels,
    indexBy: "Date",
    data: chartData,
  };

  return <Chart.Bar {...options} />;
}
