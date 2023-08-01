"use client";

import { Table } from "@/components";
import { TableColumn } from "@/components/Table/TableHeader";

const cols: TableColumn[] = [
  {
    key: "dataRealizacao",
    label: "Data",
    type: "date",
  },
  {
    key: "tuss",
    label: "Código",
    type: "text",
  },
  {
    key: "nome",
    label: "Descrição",
    type: "text",
  },
  {
    key: "categoria",
    label: "Categoria",
    type: "text",
  },
  {
    key: "sinistro",
    label: "Sinistro Total",
    type: "money",
  },
];

export interface ProcedimentoTabela {
  tuss: string;
  nome: string;
  categoria: string;
  sinistro: number;
}

export function TabelaProcedimentos({ data }: { data: ProcedimentoTabela[] }) {
  return <Table.Root columns={cols} data={data} />;
}
