import { Box, PageInitializer } from "@/components";
import { prisma } from "@/lib/db/prisma";
import { GraficoGastosGrupoCid } from "./GraficoGastosGrupoCid";
import { GraficoGastoPorCid } from "./GraficoGastoPorCid";
import { GraficoGastosCid } from "./GraficoGastosCid";

type Props = {
  params: {
    idEmpresa: string;
  };
};

export async function generateStaticParams() {
  const empresas = await prisma.empresa.findMany();

  return empresas.map((empresa) => ({ idEmpresa: empresa.id.toString() }));
}

export default async function Page({ params: { idEmpresa } }: Props) {
  const eventos = await prisma.evento.findMany({
    include: {
      CID: true,
    },
    where: {
      pessoa: {
        idEmpresa: +idEmpresa,
      },
    },
  });

  return (
    <div className="space-y-3 p-4">
      <PageInitializer title="Por CID" id="analisePorCid" parentId="analise" />

      <div className="grid grid-cols-1 gap-3 md:grid-cols-1">
        <Box.Root>
          <Box.Title>Gastos por Cid de Procedimento</Box.Title>

          <Box.Content className="h-[250px]">
            <GraficoGastosCid data={eventos} />
          </Box.Content>
        </Box.Root>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-1">
        <Box.Root>
          <Box.Title>Gastos por Cid de Procedimento</Box.Title>

          <Box.Content className="h-[350px]">
            <GraficoGastoPorCid data={eventos} />
          </Box.Content>
        </Box.Root>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-1">
        <Box.Root>
          <Box.Title>Gastos de Procedimentos por Grupos de Cid</Box.Title>

          <Box.Content className="h-[250px]">
            <GraficoGastosGrupoCid data={eventos} />
          </Box.Content>
        </Box.Root>
      </div>
    </div>
  );
}
