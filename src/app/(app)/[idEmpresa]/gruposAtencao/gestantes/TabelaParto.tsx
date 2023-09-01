"use client";

import { Table } from "@/components";
import { TableColumn } from "@/components/Table/TableHeader";
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
    key: "dataEvento",
    label: "Data do Parto",
    type: "date",
  },
  {
    key: "descricaoEvento",
    label: "Descrição",
    type: "text",
  },
  {
    key: "tipoParto",
    label: "Tipo do Parto",
    type: "text",
  },
  {
    key: "tipoInternacao",
    label: "Tipo de Internação",
    type: "text",
  },
  {
    key: "risco",
    label: "Risco",
    type: "text",
  },
];

export type PartoTabela = {
  nome: string;
  tipoTitularidade: string;
  dataEvento: Date;
  descricaoEvento: string;
  tipoParto: string;
  tipoInternacao: string;
  risco: string;
};

export function TabelaParto({
  data,
}: {
  data: PessoaWithTitularidadeEventosProcedimento[];
}) {
  const tabelaPartos: PartoTabela[] = [];
  data.forEach((pessoa) => {
    // Filtra os eventos da pessoa apenas para os eventos que são parto
    const partosPessoa = pessoa.eventos.filter((evento) => evento.tipoParto);

    if (partosPessoa.length > 0) {
      partosPessoa.forEach((evento) => {
        let tipoInternacao = "";

        if (evento.teveInternacao && evento.tipoInternacao) {
          tipoInternacao = evento.tipoInternacao;
        }

        tabelaPartos.push({
          nome: pessoa.nome,
          tipoTitularidade: pessoa.tipoTitularidade.nome,
          dataEvento: evento.dataRealizacao,
          descricaoEvento: evento.descricao,
          tipoParto: evento.tipoParto!,
          tipoInternacao,
          risco: evento.risco!,
        });
      });
    }
  });

  return <Table.Root columns={cols} data={tabelaPartos} />;
}
