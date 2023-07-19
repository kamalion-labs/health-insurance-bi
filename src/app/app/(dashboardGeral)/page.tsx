import { TabelaFaturamentoSinistro } from "./TabelaFaturamentoSinistro";
import { GraficoSinistralidadeTempo } from "./GraficoSinistralidadeTempo";
import { GraficoFaturamentoSinistro } from "./GraficoFaturamentoSinistro";
import { Box, Card, Money, PageInitializer } from "@/components";
import { prisma } from "@/lib/db/prisma";

export default async function GeralPage() {
  const eventos = await prisma.evento.findMany({
    orderBy: {
      dataPagamento: "asc",
    },
  });

  if (eventos.length === 0) {
    return <div className="p-5">Nenhum dado a ser exibido</div>;
  }

  return (
    <div className="space-y-5 p-5">
      <PageInitializer id={"dashboardGeral"} title={"Dashboard Geral"} />

      {/* Header */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <Card.Root className="bg-emerald-400 text-white">
          <Card.Title>Faturamento acumulado</Card.Title>
          <Card.Value className="flex flex-col">
            <Money
              value={eventos.reduce(
                (sum, current) => sum + +current.custoTotal,
                0
              )}
            />

            <div className="space-x-3 text-lg font-light">
              <span>Média:</span>

              <Money
                value={
                  eventos.reduce(
                    (sum, current) => sum + +current.custoTotal,
                    0
                  ) / eventos.length
                }
              />
            </div>
          </Card.Value>
        </Card.Root>

        <Card.Root className="bg-red-400 text-white">
          <Card.Title>Sinistro Acumulado</Card.Title>
          <Card.Value>
            <Money
              value={eventos.reduce(
                (sum, current) => sum + +current.sinistro,
                0
              )}
            />

            <div className="space-x-3 text-lg font-light">
              <span>Média:</span>

              <Money
                value={
                  eventos.reduce((sum, current) => sum + +current.sinistro, 0) /
                  eventos.length
                }
              />
            </div>
          </Card.Value>
        </Card.Root>

        <Card.Root className="bg-indigo-400 text-white">
          <Card.Title>Coparticipação Acumulada</Card.Title>
          <Card.Value>
            <Money
              value={eventos.reduce(
                (sum, current) => sum + +current.coparticipacao,
                0
              )}
            />

            <div className="space-x-3 text-lg font-light">
              <span>Média:</span>

              <Money
                value={
                  eventos.reduce(
                    (sum, current) => sum + +current.coparticipacao,
                    0
                  ) / eventos.length
                }
              />
            </div>
          </Card.Value>
        </Card.Root>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Gráfico 1 */}
        <Box.Root>
          <Box.Title>Faturamento x Sinistro</Box.Title>

          <Box.Content className="h-[300px]">
            <GraficoFaturamentoSinistro data={eventos} />
          </Box.Content>
        </Box.Root>

        {/* Gráfico 2 */}
        <Box.Root>
          <Box.Title>Sinistralidade por Tempo</Box.Title>

          <Box.Content className="h-[300px]">
            <GraficoSinistralidadeTempo data={eventos} />
          </Box.Content>
        </Box.Root>
      </div>

      {/* Tabela de faturamento e sinistro */}
      <Box.Root>
        <Box.Title>Tabela de Faturamento e Sinistro</Box.Title>

        <Box.Content>
          <TabelaFaturamentoSinistro data={eventos} />
        </Box.Content>
      </Box.Root>
    </div>
  );
}
