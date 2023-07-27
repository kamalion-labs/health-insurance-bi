import { Box, PageInitializer } from "@/components";
import { prisma } from "@/lib/db/prisma";
import { GraficoGastosCid } from "./GraficoGastosCid";
import { GraficoGastosGrupoCid } from "./GraficoGastosGrupoCid";

export default async function Page() {
  const eventos = await prisma.evento.findMany({
    include: {
      CID: true,
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
          <Box.Title>Gastos de Procedimentos por Grupos de Cid</Box.Title>

          <Box.Content className="h-[250px]">
            <GraficoGastosGrupoCid data={eventos} />
          </Box.Content>
        </Box.Root>
      </div>
    </div>
  );
}
