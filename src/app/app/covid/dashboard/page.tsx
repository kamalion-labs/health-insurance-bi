import { Box, PageInitializer } from "@/components";
import { GraficoCustoTotal } from "./GraficoCustoTotal";
import { prisma } from "@/lib/db/prisma";

export default async function CovidDashboard() {
  const cids = await prisma.cid.findMany({
    include: {
      eventos: true,
    },
  });

  return (
    <div className="space-y-5 p-4">
      <PageInitializer
        title="Dashboard Covid-19"
        id="covidDashboard"
        parentId="covid"
      />

      {/* Gráfico 1 */}
      <div className="grid grid-cols-1 gap-5">
        <Box.Root>
          <Box.Title>Impacto Custo Total Covid-19</Box.Title>

          <Box.Content className="h-[300px]">
            <GraficoCustoTotal data={cids} />
          </Box.Content>
        </Box.Root>
      </div>
    </div>
  );
}
