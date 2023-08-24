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

export function TabelaMamografia({
  data,
}: {
  data: PessoaWithTitularidadeEventosProcedimentoCategoria[];
}) {
  const pessoasSemMamografia = data;

  // O filtro abaixo consiste em remover do vetor de mulheres
  // aquelas que realizaram mamografia (evento com TUSS de mamografia)
  data.forEach((pessoa, index) => {
    pessoa.eventos.forEach((evento) => {
      if (evento.procedimento.tuss === Tuss.tussMamografia) {
        console.log("Pessoa realizou mamografia", pessoasSemMamografia[index]);
        pessoasSemMamografia.splice(index, 1);
      }
    });
  });

  return <Table.Root columns={cols} data={pessoasSemMamografia} />;
}
