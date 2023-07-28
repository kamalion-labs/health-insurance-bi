import { Box, PageInitializer } from "@/components";
import { prisma } from "@/lib/db/prisma";
import { PessoaTabela, TabelaMaioresUsuarios } from "./TabelaMaioresUsuarios";
import { differenceInYears } from "date-fns";
import { DetalhesPessoa } from "./DetalhesPessoa";
import { Prisma } from "@prisma/client";

type Props = {
  params: {
    idEmpresa: string;
  };
};

export async function generateStaticParams() {
  const empresas = await prisma.empresa.findMany();

  return empresas.map((empresa) => ({ idEmpresa: empresa.id.toString() }));
}

export type PessoaWithEventosCategoriaPlanoTipoTitularidade =
  Prisma.PessoaGetPayload<{
    include: {
      eventos: { include: { procedimento: { include: { categoria: true } } } };
      plano: { include: { operadora: true } };
      tipoTitularidade: true;
      dependentes: {
        include: {
          eventos: true;
          tipoTitularidade: true;
        };
      };
    };
  }>;

export default async function Page({ params: { idEmpresa } }: Props) {
  const pessoas = await prisma.pessoa.findMany({
    where: {
      idEmpresa: +idEmpresa,
    },
    include: {
      eventos: {
        orderBy: { dataPagamento: "asc" },
        include: { procedimento: { include: { categoria: true } } },
      },
      plano: { include: { operadora: true } },
      tipoTitularidade: true,
      dependentes: {
        include: {
          eventos: true,
          tipoTitularidade: true,
        },
      },
    },
  });

  let tabelaPessoas = pessoas.map<PessoaTabela>((pessoa) => {
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

  return (
    <div className="space-y-5 p-5">
      <PageInitializer
        id={"geral"}
        parentId="maioresUsuarios"
        title={"Maiores Usuários"}
      />

      <Box.Root>
        <Box.Title>Maiores 10 usuários</Box.Title>
        <Box.Content>
          <TabelaMaioresUsuarios data={tabelaPessoas} />
        </Box.Content>
      </Box.Root>

      <DetalhesPessoa data={pessoas} />
    </div>
  );
}
