import { Box, Card, PageInitializer } from "@/components";
import { prisma } from "@/lib/db/prisma";
import { GraficoFaturamentoSinistro } from "./GraficoFaturamentoSinistro";
import { GraficoSinistralidadeTempo } from "./GraficoSinistralidadeTempo";
import { GraficoServicosPorCompetencia } from "./GraficoServicosPorCompetencia";
import { Filters } from "@/components/Filters";

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
    where: {
      procedimento: {
        especialidade: {
          codigo: "psicologia",
        },
      },
      pessoa: {
        idEmpresa: +idEmpresa,
      },
    },
    include: {
      procedimento: {
        include: {
          especialidade: true,
        },
      },
    },
    orderBy: {
      dataPagamento: "asc"
    }
  });

  return (
    <div className="space-y-5 p-4">
      <PageInitializer
        title="Psicologia"
        id="psicologoa"
        parentId="gruposAtencao"
      />
      
      <Filters hideCategorias />

      <div className="grid grid-cols-3 gap-5">
        <Card.Root>
          <Card.Title>Quantidade Total de Eventos</Card.Title>
          <Card.Value>{eventos.length}</Card.Value>
        </Card.Root>

        <Card.Root>
          <Card.Title>Total de Exames de Psicologia (R$)</Card.Title>
          <Card.Value>
            R${" "}
            {eventos
              .reduce((sum, current) => sum + current.custoTotal, 0)
              .toLocaleString("pt-br", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
          </Card.Value>
        </Card.Root>

        <Card.Root>
          <Card.Title>Sinistro Total de Psicologia (R$)</Card.Title>
          <Card.Value>
            R${" "}
            {eventos
              .reduce((sum, current) => sum + current.sinistro, 0)
              .toLocaleString("pt-br", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
          </Card.Value>
        </Card.Root>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {/* Gráfico 1 */}
        <Box.Root>
          <Box.Title>Faturamento x Sinistro</Box.Title>

          <Box.Content className="h-[300px]">
            <GraficoFaturamentoSinistro data={eventos} />
          </Box.Content>
        </Box.Root>

        <Box.Root>
          <Box.Title>Sinistralidade por Tempo</Box.Title>

          <Box.Content className="h-[300px]">
            <GraficoSinistralidadeTempo data={eventos} />
          </Box.Content>
        </Box.Root>

        <Box.Root>
          <Box.Title>Serviços (Qtd) por Competência</Box.Title>

          <Box.Content className="h-[300px]">
            <GraficoServicosPorCompetencia data={eventos} />
          </Box.Content>
        </Box.Root>
      </div>
    </div>
  );
}
