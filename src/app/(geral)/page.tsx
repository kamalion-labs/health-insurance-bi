import { PrismaClient } from "@prisma/client";
import { TabelaFaturamentoSinistro } from "./TabelaFaturamentoSinistro";
import { GraficoSinistralidadeTempo } from "./GraficoSinistralidadeTempo";
import { GraficoFaturamentoSinistro } from "./GraficoFaturamentoSinistro";
import { Page, Money } from "@/components";

export const dynamic = "force-dynamic";

export default async function GeralPage() {
  const prisma = new PrismaClient();
  const competencias = await prisma.competencia.findMany();

  if (competencias.length === 0) {
    return (
      <Page title="Dashboard Geral" id="dashboardGeral" className="p-5">
        Nenhum dado a ser exibido
      </Page>
    );
  }

  return (
    <Page title="Dashboard Geral" id="dashboardGeral" className="space-y-5 p-5">
      {/* Header */}
      <div className="grid grid-cols-3 gap-3 text-white">
        <div className="flex flex-col justify-center rounded bg-alt bg-cyan-400 px-4 py-3">
          <div className="text-3xl font-bold">
            <Money
              value={competencias.reduce(
                (sum, current) => sum + +current.faturamento,
                0
              )}
            />
          </div>
          <div className="font-light">Faturamento acumulado</div>
        </div>

        <div className="flex flex-col justify-center rounded bg-alt bg-red-400 px-4 py-3">
          <div className="text-3xl font-bold">
            <Money
              value={competencias.reduce(
                (sum, current) => sum + +current.sinistro,
                0
              )}
            />
          </div>
          <div className="font-light">Sinistro Acumulado</div>
        </div>

        <div className="flex flex-col justify-center rounded bg-alt bg-purple-400 px-4 py-3">
          <div className="text-3xl font-bold">
            <Money
              value={competencias.reduce(
                (sum, current) => sum + +current.coparticipacao,
                0
              )}
            />
          </div>
          <div className="font-light">Coparticipação Acumulada</div>
        </div>
      </div>

      {/* Gráfico 1 */}
      <div className="flex flex-col space-y-5 rounded bg-alt p-4 shadow">
        <div className="text-lg font-medium">Faturamento x Sinistro</div>

        <div className="flex h-[300px]">
          <GraficoFaturamentoSinistro data={competencias} />
        </div>
      </div>

      {/* Gráfico 2 */}
      <div className="flex flex-col space-y-5 rounded bg-alt p-4 shadow">
        <div className="text-lg font-medium">Sinistralidade por Tempo</div>

        <div className="flex h-[300px]">
          <GraficoSinistralidadeTempo data={competencias} />
        </div>
      </div>

      {/* Tabela de faturamento e sinistro */}
      <div className="flex flex-col space-y-5 rounded bg-alt p-4 shadow">
        <div className="text-lg font-medium">
          Tabela de Faturamento e Sinistro
        </div>

        <TabelaFaturamentoSinistro data={competencias} />
      </div>
    </Page>
  );
}
