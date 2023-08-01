import { Table } from "@/components";
import { TableColumn } from "@/components/Table/TableHeader";
import { Evento } from "@prisma/client";
import { format } from "date-fns";

const cols: TableColumn[] = [
  {
    key: "dataPagamento",
    label: "Competência",
    type: "text",
  },
  {
    key: "faturamento",
    label: "Faturamento",
    type: "money",
  },
  {
    key: "sinistro",
    label: "Sinistro",
    type: "money",
  },
  {
    key: "coparticipacao",
    label: "Coparticipação",
    type: "money",
  },
];

export function TabelaFaturamentoSinistro({ data }: { data: Evento[] }) {
  data = data.sort(
    (a, b) => b.dataPagamento!.getTime() - a.dataPagamento!.getTime()
  );

  const competencias = [
    ...new Set(data.map((evento) => format(evento.dataPagamento!, "MM/yyyy"))),
  ];

  const filteredData = competencias.map((comp) => {
    const eventosCompetencia = data.filter(
      (evento) => format(evento.dataPagamento!, "MM/yyyy") === comp
    );

    return {
      dataPagamento: comp,
      faturamento: eventosCompetencia.reduce(
        (sum, current) => sum + current.custoTotal,
        0
      ),
      sinistro: eventosCompetencia.reduce(
        (sum, current) => sum + current.sinistro,
        0
      ),
      coparticipacao: eventosCompetencia.reduce(
        (sum, current) => sum + current.coparticipacao,
        0
      ),
    };
  });

  return <Table.Root columns={cols} data={filteredData} />;
}
