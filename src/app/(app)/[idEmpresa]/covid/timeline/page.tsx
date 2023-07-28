import { Box, PageInitializer } from "@/components";
import { prisma } from "@/lib/db/prisma";
import { GraficoQuantidadeEventosPorCompetencia } from "./GraficoQuantidadeEventosPorCompetencia";
import { GraficoFaturamentoPorCompetencia } from "./GraficoFaturamentoPorCompetencia";

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
      <PageInitializer
        title="Análise Temporal"
        parentId="covid"
        id="covidTimeline"
      />

      <div className="grid grid-cols-1 gap-3 md:grid-cols-1">
        <Box.Root>
          <Box.Title>
            Quantidade de Procedimentos de Covid Por Competência
          </Box.Title>

          <Box.Content className="h-[250px]">
            <GraficoQuantidadeEventosPorCompetencia data={eventos} />
          </Box.Content>
        </Box.Root>

        <Box.Root>
          <Box.Title>
            Faturamento de Procedimentos de Covid Por Competência
          </Box.Title>

          <Box.Content className="h-[250px]">
            <GraficoFaturamentoPorCompetencia data={eventos} />
          </Box.Content>
        </Box.Root>
      </div>
    </div>
  );
}
