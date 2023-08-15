"use client";

import { Table } from "@/components";
import { TableColumn } from "@/components/Table/TableHeader";
import { useFiltro } from "@/stores";
import { usePessoa } from "@/stores/pessoa.store";
import { differenceInYears } from "date-fns";
import { PessoaWithEventosCategoriaPlanoTipoTitularidade } from "./page";

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

export function TabelaMaioresUsuarios({
  pessoas,
}: {
  pessoas: PessoaWithEventosCategoriaPlanoTipoTitularidade[];
}) {
  const { id, setId } = usePessoa();
  const { idCategoria } = useFiltro();

  const filteredData = idCategoria
    ? pessoas.filter((pessoa) =>
        pessoa.eventos.some((x) => x.procedimento.idCategoria === idCategoria)
      )
    : pessoas;

  console.log({ idCategoria, filteredData });

  let tabelaPessoas = filteredData.map<PessoaTabela>((pessoa) => {
    const idade = differenceInYears(new Date(), pessoa.dataNascimento!);
    const sinistroTotal = pessoa.eventos.reduce(
      (sum, current) => sum + current.custoTotal,
      0
    );
    const titularidade = pessoa.tipoTitularidade.nome;
    const plano = pessoa.plano.nome;

    return {
      id: pessoa.id,
      nome: pessoa.nome,
      idade,
      sinistroTotal,
      titularidade,
      dependentes: pessoa.dependentes.length,
      plano,
    };
  });

  tabelaPessoas = tabelaPessoas
    .sort((a, b) => b.sinistroTotal - a.sinistroTotal)
    .splice(0, 10);

  const pessoa = tabelaPessoas.find((x) => x.id === id);

  async function handleSelectPessoa(item: PessoaTabela) {
    setId(item.id);
  }

  return (
    <Table.Root
      columns={cols}
      data={tabelaPessoas}
      onSelect={handleSelectPessoa}
      selected={pessoa}
      usePagination={false}
    />
  );
}
