"use client";

import { Table } from "@/components";
import { TableColumn } from "@/components/Table/TableHeader";
import { Evento } from "@prisma/client";

const cols: TableColumn[] = [
  {
    key: "dataRealizacao",
    label: "Data de Realização",
    type: "date",
  },
  {
    key: "pessoa.nome",
    label: "Nome",
    type: "text",
  },
  {
    key: "pessoa.idTipoTitularidade",
    label: "Titularidade",
    type: "text",
  },
  {
    key: "procedimento.tuss",
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

export function TabelaExamesCovid({ data }: { data: Evento[] }) {
  const eventosAtualizados = data.map((evento) => ({
    ...evento,
    teveInternacao: evento.teveInternacao
      ? "Sim"
      : ("Não" as unknown as boolean | null),
  }));

  return <Table.Root columns={cols} data={eventosAtualizados} />;
}
