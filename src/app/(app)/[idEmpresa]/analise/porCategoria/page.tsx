import { Box, Card, PageInitializer } from "@/components";
import { prisma } from "@/lib/db/prisma";
import { GraficoGastosCategoria } from "./GraficoGastosCategoria";
import { GraficoServicos } from "./GraficoServicos";
import { GraficoEventosPorFaixaValor } from "./GraficoEventosPorFaixaValor";
import { GraficoServicosPorCompetencia } from "./GraficoServicosPorCompetencia";
import { GraficoGastosPorCompetencia } from "./GraficoGastosPorCompetencia";
import { GraficoSinistroEspecialidade } from "./GraficoSinistroEspecialidade";
import { GraficoTempoMedioPagamento } from "./GraficoTempoMedioPagamento";

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
      pessoa: {
        idEmpresa: +idEmpresa,
      },
    },
    include: {
      procedimento: { include: { categoria: true, especialidade: true } },
    },
    orderBy: {
      dataPagamento: "asc",
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
          },
        },
      },
    },
  });

  return (
    <div className="space-y-3 p-4">
      <PageInitializer
        title="Por Categoria"
        id="analisePorCategoria"
        parentId="analise"
      />

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <Card.Root>
          <Card.Title>Procedimentos (Qtd)</Card.Title>
          <Card.Value className="flex flex-col">{eventos.length}</Card.Value>
        </Card.Root>

        <Card.Root>
          <Card.Title>Procedimentos (R$)</Card.Title>
          <Card.Value className="flex flex-col">
            R${" "}
            {eventos
              .reduce((sum, current) => sum + current.custoTotal, 0)
              .toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
          </Card.Value>
        </Card.Root>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <Box.Root>
          <Box.Title>Gastos por Categoria de Procedimento</Box.Title>

          <Box.Content className="h-[250px]">
            <GraficoGastosCategoria data={categorias} />
          </Box.Content>
        </Box.Root>

        <Box.Root>
          <Box.Title>Sinistro por Especialidade (R$)</Box.Title>

          <Box.Content className="h-[250px]">
            <GraficoSinistroEspecialidade data={especialidades} />
          </Box.Content>
        </Box.Root>
      </div>

      <div className="grid grid-cols-1 gap-5">
        <Box.Root>
          <Box.Title>Quantidade de Eventos por Faixa de Valor</Box.Title>

          <Box.Content>
            <GraficoEventosPorFaixaValor data={eventos} />
          </Box.Content>
        </Box.Root>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Box.Root>
          <Box.Title>Serviços (Qtd) por competência</Box.Title>

          <Box.Content className="h-[300px]">
            <GraficoServicosPorCompetencia
              data={eventos}
              categorias={categorias}
            />
          </Box.Content>
        </Box.Root>

        <Box.Root>
          <Box.Title>Gastos por Categorias e Competência</Box.Title>

          <Box.Content className="h-[300px]">
            <GraficoGastosPorCompetencia
              data={eventos}
              categorias={categorias}
            />
          </Box.Content>
        </Box.Root>
      </div>

      <div className="grid grid-cols-1 gap-5">
        <Box.Root>
          <Box.Title>Serviços (Qtd)</Box.Title>

          <Box.Content className="h-[350px]">
            <GraficoServicos data={categorias} />
          </Box.Content>
        </Box.Root>
      </div>

      <div className="grid grid-cols-1 gap-5">
        <Box.Root>
          <Box.Title>Tempo médio de pagamento por competência</Box.Title>

          <Box.Content className="h-[350px]">
            <GraficoTempoMedioPagamento data={eventos} />
          </Box.Content>
        </Box.Root>
      </div>
    </div>
  );
}
