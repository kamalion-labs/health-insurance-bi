import { Box, PageInitializer } from "@/components";
import { prisma } from "@/lib/db/prisma";
import { TabelaRiscoDM } from "./TabelaRiscoDM";
import { Prisma } from "@prisma/client";
import { TabelaRiscoHAS } from "./TabelaRiscoHAS";

type Props = {
  params: {
    idEmpresa: string;
  };
};

export async function generateStaticParams() {
  const empresas = await prisma.empresa.findMany();

  return empresas.map((empresa) => ({ idEmpresa: empresa.id.toString() }));
}

export type PessoaWithTitularidade = Prisma.PessoaGetPayload<{
  include: {
    tipoTitularidade: true;
  };
}>;

export default async function Page({ params: { idEmpresa } }: Props) {
  const pessoas = await prisma.pessoa.findMany({
    where: {
      idEmpresa: +idEmpresa,
    },
    include: {
      tipoTitularidade: true,
    },
  });

  return (
    <div className="space-y-5 p-5">
      <PageInitializer
        title="Risco DM e HAS"
        id="risco"
        parentId="previsaoSinistro"
      />

      <Box.Root>
        <Box.Title>Risco de Diabetes Mellitus</Box.Title>

        <Box.Content>
          <TabelaRiscoDM pessoas={pessoas} />
        </Box.Content>
      </Box.Root>

      <Box.Root>
        <Box.Title>Risco de Hipertensão Arterial Sistêmica</Box.Title>

        <Box.Content>
          <TabelaRiscoHAS pessoas={pessoas} />
        </Box.Content>
      </Box.Root>
    </div>
  );
}
