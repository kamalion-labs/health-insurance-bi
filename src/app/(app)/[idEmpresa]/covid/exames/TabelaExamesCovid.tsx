"use client";

import { Table } from "@/components";
import { TableColumn } from "@/components/Table/TableHeader";

const cols: TableColumn[] = [
  {
    key: "nome",
    label: "Nome",
    type: "text",
  },
  {
    key: "dataRealizacao",
    label: "Data de Realização",
    type: "date",
  },
  {
    key: "titularidade",
    label: "Titularidade",
    type: "text",
  },
  {
    key: "codigoProcedimento",
    label: "Código Procedimento",
    type: "text",
  },
  {
    key: "descricao",
    label: "Descrição",
    type: "text",
  },
  {
    key: "quantidade",
    label: "Quantidade",
    type: "text",
  },
  {
    key: "teveInternacao",
    label: "Teve Internação",
    type: "text",
  },
  {
    key: "custoTotal",
    label: "Custo Total",
    type: "money",
  },
];

export interface ExamesTabela {
  nome: string;
  dataRealizacao: Date;
  titularidade: string;
  codigoProcedimento: string;
  descricao: string;
  quantidade: number;
  teveInternacao: string;
  custoTotal: number;
}

export function TabelaExamesCovid({ data }: { data: ExamesTabela[] }) {
  return <Table.Root columns={cols} data={data} />;
}
