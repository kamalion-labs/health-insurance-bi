"use client";

import { Table } from "@/components";
import { TableColumn } from "@/components/Table/TableHeader";
import { Prisma } from "@prisma/client";

type LiberacaoWithPrestadorEvento = Prisma.LiberacaoGetPayload<{
  include: { prestador: { include: { eventos: true } } };
}>;

const cols: TableColumn[] = [
  {
    key: "certificado",
    label: "Certificado",
    type: "text",
  },
  {
    key: "dependencia",
    label: "Dependência",
    type: "text",
  },
  {
    key: "contrato",
    label: "Contrato",
    type: "text",
  },
  {
    key: "subfatura",
    label: "Subfatura",
    type: "text",
  },
  {
    key: "dataSolicitacao",
    label: "Data de Solicitação",
    type: "date",
  },
  {
    key: "dataInternacao",
    label: "Data de Internação",
    type: "date",
  },
  {
    key: "possuiLiminar",
    label: "Possui Liminar",
    type: "text",
  },
  {
    key: "regimeInternacao",
    label: "Regime de Internação",
    type: "text",
  },
  {
    key: "senha",
    label: "Senha",
    type: "text",
  },
  {
    key: "situacaoSenha",
    label: "Situação da Senha",
    type: "text",
  },
  {
    key: "diasSolicitacaoSenha",
    label: "Dias de Solicitação da Senha",
    type: "text",
  },
  {
    key: "diasLiberacaoSenha",
    label: "Dias de Liberacao da Senha",
    type: "text",
  },
];

export interface LiberacaoTabela {
  certificado: number;
  dependencia: number | null;
  contrato: number | null;
  subfatura: number | null;
  dataSolicitacao: Date | null;
  possuiLiminar: string;
  regimeInternacao: string | null;
  dataInternacao: Date | null;
  senha: string | null;
  situacaoSenha: string | null;
  diasSolicitacaoSenha: number | null;
  diasLiberacaoSenha: number | null;
}

export function TabelaLiberacoes({
  liberacoes,
}: {
  liberacoes: LiberacaoWithPrestadorEvento[];
}) {
  let tabelaLiberacoes = liberacoes.map<LiberacaoTabela>((liberacao) => {
    const possuiLiminar = liberacao.possuiLiminar ? "Sim" : "Não";

    // verificar o que preencher quando for null.
    // const dataInternacao = liberacao.dataInternacao
    //   ? liberacao.dataInternacao
    //   : new Date();

    console.log(liberacao.dataInternacao);

    return {
      certificado: liberacao.certificado,
      dependencia: liberacao.dependencia,
      contrato: liberacao.contrato,
      subfatura: liberacao.subfatura,
      dataSolicitacao: liberacao.dataSolicitacao,
      possuiLiminar,
      regimeInternacao: liberacao.regimeInternacao,
      dataInternacao: liberacao.dataInternacao,
      senha: liberacao.senha,
      situacaoSenha: liberacao.situacaoSenha,
      diasSolicitacaoSenha: liberacao.diasSolicitacaoSenha,
      diasLiberacaoSenha: liberacao.diasLiberacaoSenha,
    };
  });

  tabelaLiberacoes = tabelaLiberacoes.sort(
    (a, b) =>
      new Date(a.dataSolicitacao!).getTime() -
      new Date(b.dataSolicitacao!).getTime()
  ); // Verificar a adição do splice ou criação da paginação aqui

  return <Table.Root columns={cols} data={tabelaLiberacoes} />;
}
