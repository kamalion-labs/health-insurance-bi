"use client";

import { Table } from "@/components";
import { TableColumn } from "@/components/Table/TableHeader";
import { usePessoa } from "@/stores/pessoa.store";

const cols: TableColumn[] = [
  {
    key: "nome",
    label: "Nome",
    type: "text",
  },
  {
    key: "idade",
    label: "Idade",
    type: "text",
  },
  {
    key: "titularidade",
    label: "Titularidade",
    type: "text",
  },
  {
    key: "dependentes",
    label: "Dependentes",
    type: "text",
  },
  {
    key: "plano",
    label: "Plano",
    type: "text",
  },
  {
    key: "sinistroTotal",
    label: "Sinistro Total",
    type: "money",
  },
];

export interface PessoaTabela {
  id: number;
  nome: string;
  idade: number;
  sinistroTotal: number;
  titularidade: string;
  dependentes: number;
  plano: string;
}

export function TabelaMaioresUsuarios({ data }: { data: PessoaTabela[] }) {
  const { id, setId } = usePessoa();

  const pessoa = data.find((x) => x.id === id);

  async function handleSelectPessoa(item: PessoaTabela) {
    setId(item.id);
  }

  return (
    <Table.Root
      columns={cols}
      data={data}
      onSelect={handleSelectPessoa}
      selected={pessoa}
    />
  );
}
