import { TabelaFaturamentoSinistro } from "./TabelaFaturamentoSinistro";
import { GraficoSinistralidadeTempo } from "./GraficoSinistralidadeTempo";
import { GraficoFaturamentoSinistro } from "./GraficoFaturamentoSinistro";
import { GraficoSinistroEspecialidade } from "./GraficoSinistroEspecialidade";
import { Box, PageInitializer } from "@/components";
import { prisma } from "@/lib/db/prisma";
import { format } from "date-fns";
import { GraficoGastosCategoria } from "./GraficoGastosCategoria";
import { Filters } from "@/components/Filters";
import { Prisma } from "@prisma/client";
import { Header } from "./Header";

export type EventoWithChilds = Prisma.EventoGetPayload<{
  include: { procedimento: true };
}>;

export async function generateStaticParams() {
  const empresas = await prisma.empresa.findMany();

  return empresas.map((empresa) => ({ idEmpresa: empresa.id.toString() }));
}

type Props = {
  params: {
    idEmpresa: string;
  };
};

export default async function GeralPage({ params: { idEmpresa } }: Props) {
  const eventos = await prisma.evento.findMany({
    where: {
      pessoa: {
        idEmpresa: +idEmpresa,
      },
    },
    orderBy: {
      dataPagamento: "asc",
    },
    include: {
      procedimento: true,
    },
  });

  const categorias = await prisma.categoria.findMany({
    include: {
      procedimentos: {
        include: {
          eventos: {
            where: {
              pessoa: {
                idEmpresa: +idEmpresa,
              },
            },
            orderBy: {
              dataRealizacao: "desc",
            },
            take: 1,
          },
        },
      },
    },
  });

  const especialidades = await prisma.especialidade.findMany({
    include: {
      procedimentos: {
        include: {
          eventos: {
            where: {
              pessoa: {
                idEmpresa: +idEmpresa,
              },
            },
            orderBy: {
              dataRealizacao: "desc",
            },
            take: 1,
          },
        },
      },
    },
  });

  return (
    <div className="space-y-3 p-5">
      <PageInitializer id={"dashboardGeral"} title={"Dashboard Geral"} />

      {eventos.length === 0 && (
        <div className="p-5">Nenhum dado a ser exibido</div>
      )}

      {eventos.length > 0 && (
        <>
          <Filters />

          <Header eventos={eventos} />

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {/* Gráfico 1 */}
            <Box.Root>
              <Box.Title>Faturamento x Sinistro</Box.Title>

              <Box.Content className="h-[300px]">
                <GraficoFaturamentoSinistro data={eventos} />
              </Box.Content>
            </Box.Root>

            {/* Gráfico 2 */}
            <Box.Root>
              <Box.Title>
                <div>Sinistro por Especialidade</div>
              </Box.Title>

              <Box.Content className="h-[300px]">
                <div className="px-4 text-sm">
                  Competência: {format(eventos[0].dataRealizacao, "MM/yyyy")}
                </div>
                <GraficoSinistroEspecialidade data={especialidades} />
              </Box.Content>
            </Box.Root>

            {/* Gráfico 3 */}
            <Box.Root>
              <Box.Title>
                <div>Gastos por Categoria de Procedimento</div>
              </Box.Title>

              <Box.Content className="h-[300px]">
                <div className="px-4 text-sm">
                  Competência: {format(eventos[0].dataRealizacao, "MM/yyyy")}
                </div>
                <GraficoGastosCategoria data={categorias} />
              </Box.Content>
            </Box.Root>
          </div>

          {/* Gráfico 3 */}
          <Box.Root>
            <Box.Title>Sinistralidade por Tempo</Box.Title>

            <Box.Content className="h-[300px]">
              <GraficoSinistralidadeTempo data={eventos} />
            </Box.Content>
          </Box.Root>

          {/* Tabela de faturamento e sinistro */}
          <Box.Root>
            <Box.Title>Tabela de Faturamento e Sinistro</Box.Title>

            <Box.Content>
              <TabelaFaturamentoSinistro data={eventos} />
            </Box.Content>
          </Box.Root>
        </>
      )}
    </div>
  );
}
