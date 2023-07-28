"use client";

import { Table } from "@/components";
import { TableColumn } from "@/components/Table/TableHeader";
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
}

export function TabelaCustosFamiliares({
  data,
}: {
  data: PessoaWithEventosCategoriaPlanoTipoTitularidade;
}) {
  const tabelaDependentes = data.dependentes.map<PessoaTabela>((dependente) => {
    const idade = differenceInYears(new Date(), dependente.dataNascimento!);
    const sinistroTotal = dependente.eventos.reduce(
      (sum, current) => sum + current.custoTotal,
      0
    );
    const titularidade = dependente.tipoTitularidade.nome;

    return {
      id: dependente.id,
      nome: dependente.nome,
      idade,
      sinistroTotal,
      titularidade,
    };
  });

  return <Table.Root columns={cols} data={tabelaDependentes} />;
}
