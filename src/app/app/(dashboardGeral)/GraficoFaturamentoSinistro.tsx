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
  const chartData = data.reduce<DataType[]>((previous, current) => {
    let competencia = previous.find(
      (x) => x.Date === format(new Date(current.dataPagamento!), "MM/yyyy")
    );

    if (competencia) {
      previous.splice(previous.indexOf(competencia), 1, {
        ...competencia,
        Faturamento: competencia.Faturamento + Number(current.custoTotal),
        Sinistro: competencia.Sinistro + Number(current.sinistro),
        Coparticipacao:
          competencia.Coparticipacao + Number(current.coparticipacao),
      });
    } else {
      competencia = {
        Date: format(new Date(current.dataPagamento!), "MM/yyyy"),
        Faturamento: Number(current.custoTotal),
        FaturamentoColor: "#52CD9F",
        Sinistro: Number(current.sinistro),
        SinistroColor: "#F87171",
        Coparticipacao: Number(current.coparticipacao),
        CoparticipacaoColor: "#5B93FF",
      };

      previous.push(competencia);
    }

    return previous;
  }, []);

  const options = {
    keys: labels,
    indexBy: "Date",
    groupMode: "grouped",
    data: chartData,
  };

  return <Chart.Bar {...options} />;
}
