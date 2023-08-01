import { Box, PageInitializer } from "@/components";
import { prisma } from "@/lib/db/prisma";
import { TabelaMaioresUsuarios } from "./TabelaMaioresUsuarios";
import { DetalhesPessoa } from "./DetalhesPessoa";
import { Prisma } from "@prisma/client";
import { Filtros } from "./Filtros";

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
  const categorias = await prisma.categoria.findMany();
  const cids = await prisma.cid.findMany();

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

  return (
    <div className="space-y-5 p-5">
      <PageInitializer
        id={"geral"}
        parentId="maioresUsuarios"
        title={"Maiores Usuários"}
      />

      <Box.Root>
        <Box.Title>Filtros</Box.Title>
        <Box.Content className="px-4">
          <Filtros categorias={categorias} cids={cids} />
        </Box.Content>
      </Box.Root>

      <Box.Root>
        <Box.Title>Maiores 10 usuários</Box.Title>
        <Box.Content>
          <TabelaMaioresUsuarios pessoas={pessoas} />
        </Box.Content>
      </Box.Root>

      <DetalhesPessoa data={pessoas} />
    </div>
  );
}
