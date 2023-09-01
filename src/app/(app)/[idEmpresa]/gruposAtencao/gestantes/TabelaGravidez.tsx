"use client";

import { Table } from "@/components";
import { TableColumn } from "@/components/Table/TableHeader";
import { Tuss } from "@/lib/consts";
import { Prisma } from "@prisma/client";

type PessoaWithTitularidadeEventosProcedimento = Prisma.PessoaGetPayload<{
  include: {
    tipoTitularidade: true;
    eventos: {
      include: {
        procedimento: true;
      };
    };
  };
}>;

const cols: TableColumn[] = [
  {
    key: "nome",
    label: "Nome",
    type: "text",
  },
  {
    key: "tipoTitularidade",
    label: "Titularidade",
    type: "text",
  },
  {
    key: "nomeProcedimento",
    label: "Último procedimento de gravidez realizado",
    type: "text",
  },
  {
    key: "dataEvento",
    label: "Data do último procedimento de gravidez",
    type: "date",
  },
  {
    key: "descricaoEvento",
    label: "Descrição do procedimento",
    type: "text",
  },
  {
    key: "risco",
    label: "Risco",
    type: "text",
  },
  {
    key: "diabetes",
    label: "Score DM",
    type: "text",
  },
  {
    key: "hipertensao",
    label: "Score HAS",
    type: "text",
  },
];

export interface GravidezTabela {
  nome: string;
  tipoTitularidade: string;
  nomeProcedimento: string;
  dataEvento: Date;
  descricaoEvento: string;
  risco: string;
  diabetes: string;
  hipertensao: string;
}

export function TabelaGravidez({
  data,
}: {
  data: PessoaWithTitularidadeEventosProcedimento[];
}) {
  const data10MesesAtras = new Date();
  data10MesesAtras.setMonth(data10MesesAtras.getMonth() - 10);

  const tabelaGravidez = data.map((pessoa) => {
    // Filtra os eventos da pessoa apenas para os eventos de gravidez
    // Após isso, filtra os eventos apenas para os que ocorreram nos últimos 10 meses
    const eventosPessoa = pessoa.eventos
      .filter((evento) => Tuss.tussGravidez.includes(evento.procedimento.tuss))
      .filter((evento) => evento.dataRealizacao! >= data10MesesAtras);

    // Os dados de diabates e hipertensão foram adicionados pois, segundo o MS, pode ser uma complicação
    // Fonte: https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/g/gravidez
    return {
      nome: pessoa.nome,
      tipoTitularidade: pessoa.tipoTitularidade.nome,
      nomeProcedimento: eventosPessoa[0].procedimento.nome,
      dataEvento: eventosPessoa[0].dataRealizacao,
      descricaoEvento: eventosPessoa[0].descricao,
      risco: eventosPessoa[0].risco,
      diabetes: pessoa.scoreDiabetes,
      hipertensao: pessoa.scoreHipertensao,
    };
  });

  return <Table.Root columns={cols} data={tabelaGravidez} />;
}
