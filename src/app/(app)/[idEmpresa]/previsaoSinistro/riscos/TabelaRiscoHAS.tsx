"use client";

import { Table } from "@/components";
import { TableColumn } from "@/components/Table/TableHeader";
import { differenceInYears } from "date-fns";
import { PessoaWithTitularidade } from "./page";

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
    key: "sexo",
    label: "Sexo",
    type: "text",
  },
  {
    key: "titularidade",
    label: "Titularidade",
    type: "text",
  },
  {
    key: "scoreHipertensao",
    label: "Score Hipertensão",
    type: "text",
  },
  {
    key: "risco",
    label: "Risco",
    type: "text",
  },
];

export interface PessoaTabela {
  id: number;
  nome: string;
  idade: number;
  sexo: string;
  titularidade: string;
  scoreHipertensao: number;
  risco: string;
}

export function TabelaRiscoHAS({
  pessoas,
}: {
  pessoas: PessoaWithTitularidade[];
}) {
  let tabelaPessoas = pessoas.map((pessoa) => {
    const idade = differenceInYears(new Date(), pessoa.dataNascimento!);

    let risco = "";

    if (pessoa.scoreHipertensao! < 0.6) {
      risco = "Baixo";
    } else if (
      pessoa.scoreHipertensao! >= 0.6 &&
      pessoa.scoreHipertensao! < 0.8
    ) {
      risco = "Médio";
    } else {
      risco = "Alto";
    }

    let sexo = "";
    if (pessoa.sexo === "M") {
      sexo = "Masculino";
    } else if (pessoa.sexo === "F") {
      sexo = "Feminino";
    } else {
      sexo = "Não Informado";
    }

    return {
      id: pessoa.id,
      nome: pessoa.nome,
      idade,
      sexo,
      scoreHipertensao: pessoa.scoreHipertensao?.toFixed(2),
      risco,
      titularidade: pessoa.tipoTitularidade.nome,
    };
  });

  tabelaPessoas = tabelaPessoas
    .sort(
      (a, b) =>
        parseFloat(b.scoreHipertensao!) - parseFloat(a.scoreHipertensao!)
    )
    .splice(0, 10);

  return <Table.Root columns={cols} data={tabelaPessoas} />;
}
