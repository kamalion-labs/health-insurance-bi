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
    key: "dataPagamento",
    label: "Data de Pagamento",
    type: "text",
  },
  {
    key: "nome",
    label: "Nome",
    type: "text",
  },
  {
    key: "nome",
    label: "Titularidade",
    type: "text",
  },
  {
    key: "codigo",
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
];

export function TabelaExamesSRAG({ data }: { data: Evento[] }) {
  return <Table.Root columns={cols} data={data} />;
}
