import { PrismaClient } from "@prisma/client";
import { TabelaFaturamentoSinistro } from "./TabelaFaturamentoSinistro";
import { GraficoSinistralidadeTempo } from "./GraficoSinistralidadeTempo";
import { GraficoFaturamentoSinistro } from "./GraficoFaturamentoSinistro";
import { Money, PageInitializer } from "@/components";

export const dynamic = "force-dynamic";

export default async function GeralPage() {
  const prisma = new PrismaClient();
  let eventos = await prisma.evento.findMany();

  eventos = JSON.parse(JSON.stringify(eventos));

  if (eventos.length === 0) {
    return <div className="p-5">Nenhum dado a ser exibido</div>;
  }

  return (
    <div className="space-y-5 p-5">
      <PageInitializer id={"dashboardGeral"} title={"Dashboard Geral"} />

      {/* Header */}
      <div className="grid grid-cols-3 gap-3 text-white">
        <div className="flex flex-col justify-center rounded bg-[#52CD9F] bg-alt px-4 py-3">
          <div className="text-3xl font-bold">
            <Money
              value={eventos.reduce(
                (sum, current) => sum + +current.custoTotal,
                0
              )}
            />
          </div>
          <div className="font-light">Faturamento acumulado</div>
        </div>

        <div className="flex flex-col justify-center rounded bg-alt bg-red-400 px-4 py-3">
          <div className="text-3xl font-bold">
            <Money
              value={eventos.reduce(
                (sum, current) => sum + +current.sinistro,
                0
              )}
            />
          </div>
          <div className="font-light">Sinistro Acumulado</div>
        </div>

        <div className="flex flex-col justify-center rounded bg-[#5B93FF] bg-alt px-4 py-3">
          <div className="text-3xl font-bold">
            <Money
              value={eventos.reduce(
                (sum, current) => sum + +current.coparticipacao,
                0
              )}
            />
          </div>
          <div className="font-light">Coparticipação Acumulada</div>
        </div>
      </div>

      {/* Gráfico 1 */}
      <div className="flex space-x-5">
        <div className="flex flex-1 flex-col space-y-5 rounded border border-slate-300 bg-main p-4">
          <div className="text-lg font-medium">Faturamento x Sinistro</div>

          <div className="flex h-[300px]">
            <GraficoFaturamentoSinistro data={eventos} />
          </div>
        </div>

        {/* Gráfico 2 */}
        <div className="flex flex-1 flex-col space-y-5 rounded border border-slate-300 bg-main p-4">
          <div className="text-lg font-medium">Sinistralidade por Tempo</div>

          <div className="flex h-[300px]">
            <GraficoSinistralidadeTempo data={eventos} />
          </div>
        </div>
      </div>

      {/* Tabela de faturamento e sinistro */}
      <div className="flex flex-col space-y-5 rounded border border-slate-300 bg-main p-4">
        <div className="text-lg font-medium">
          Tabela de Faturamento e Sinistro
        </div>

        <TabelaFaturamentoSinistro data={eventos} />
      </div>
    </div>
  );
}
