"use client";

import { Table } from "@/components";
import { TableColumn } from "@/components/Table/TableHeader";
import { Tuss } from "@/lib/consts";
import { Prisma } from "@prisma/client";

type PessoaWithTitularidadeEventosProcedimentoCategoria =
  Prisma.PessoaGetPayload<{
    include: {
      tipoTitularidade: true;
      eventos: { include: { procedimento: { include: { categoria: true } } } };
    };
  }>;

const cols: TableColumn[] = [
  {
    key: "nome",
    label: "Nome",
    type: "text",
  },
  {
    key: "tipoTitularidade.nome",
    label: "Titularidade",
    type: "text",
  },
];

export function TabelaPapanicolau({
  data,
}: {
  data: PessoaWithTitularidadeEventosProcedimentoCategoria[];
}) {
  const pessoasSemPapanicolau = data;

  // O filtro abaixo consiste em remover do vetor de mulheres
  // aquelas que realizaram papanicolau (evento com TUSS de papanicolau)
  data.forEach((pessoa, index) => {
    pessoa.eventos.forEach((evento) => {
      if (evento.procedimento.tuss === Tuss.tussPapanicolau) {
        console.log(
          "Pessoa realizou papanicolau",
          pessoasSemPapanicolau[index]
        );
        pessoasSemPapanicolau.splice(index, 1);
      }
    });
  });

  return <Table.Root columns={cols} data={pessoasSemPapanicolau} />;
}
