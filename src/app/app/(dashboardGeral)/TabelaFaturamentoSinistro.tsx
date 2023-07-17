"use client";

import { Table } from "@/components";
import { TableColumn } from "@/components/Table/TableHeader";
import { Evento } from "@prisma/client";

const cols: TableColumn[] = [
  {
    key: "dataPagamento",
    label: "Competência",
    type: "date",
  },
  {
    key: "custoTotal",
    label: "Faturamento",
    type: "money",
  },
  {
    key: "coparticipacao",
    label: "Coparticipação",
    type: "money",
  },
  {
    key: "sinistro",
    label: "Sinistro",
    type: "money",
  },
];

export function TabelaFaturamentoSinistro({ data }: { data: Evento[] }) {
  return <Table.Root columns={cols} data={data} />;
}
