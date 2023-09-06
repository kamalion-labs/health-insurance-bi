import { Box, Card, PageInitializer } from "@/components";
import { prisma } from "@/lib/db/prisma";
import { GraficoSinistroEspecialidade } from "./GraficoSinistroPorEspecialidade";
import { GraficoExamesPorFaixaValor } from "./GraficoExamesPorFaixaValor";
import { GraficoExamesPorCompetencia } from "./GraficoExamesPorCompetencia";
import { GraficoGastosPorCompetencia } from "./GraficoGastosPorCompetencia";
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
  const exames = await prisma.evento.findMany({
    where: {
      pessoa: {
        idEmpresa: +idEmpresa,
      },
      procedimento: {
        categoria: {
          nome: "Exames",
        },
      },
    },
    include: {
      procedimento: { include: { categoria: true, especialidade: true } },
    },
  });

  const especialidades = await prisma.especialidade.findMany({
    include: {
      procedimentos: {
        where: {
          categoria: {
            nome: "Exames",
          },
        },
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
        title="De Exames"
        id="analiseDeExames"
        parentId="analise"
      />

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <Card.Root>
          <Card.Title>Exames (Qtd)</Card.Title>
          <Card.Value className="flex flex-col">{exames.length}</Card.Value>
        </Card.Root>

        <Card.Root>
          <Card.Title>Exames (R$)</Card.Title>
          <Card.Value className="flex flex-col">
            R${" "}
            {exames
              .reduce((soma, atual) => (soma = soma + atual.custoTotal), 0)
              .toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
          </Card.Value>
        </Card.Root>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <Box.Root>
          <Box.Title>Sinistro por Especialidade (R$)</Box.Title>
          {/** Pensando no melhor gráfico pra colocar aq */}
          <Box.Content className="h-[250px]">;</Box.Content>
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
          <Box.Title>Quantidade de Exames por Faixa de Valor</Box.Title>

          <Box.Content>
            <GraficoExamesPorFaixaValor data={exames} />
          </Box.Content>
        </Box.Root>
      </div>

      <Box.Root>
        <Box.Title>Exames (Qtd) por Competência</Box.Title>

        <Box.Content className="h-[300px]">
          <GraficoExamesPorCompetencia data={exames} />
        </Box.Content>
      </Box.Root>

      <Box.Root>
        <Box.Title>Gastos de Exames por Competência</Box.Title>

        <Box.Content className="h-[300px]">
          <GraficoGastosPorCompetencia data={exames} />
        </Box.Content>
      </Box.Root>

      <div className="grid grid-cols-1 gap-5">
        <Box.Root>
          <Box.Title>Tempo médio de pagamento por competência</Box.Title>

          <Box.Content className="h-[350px]">
            <GraficoTempoMedioPagamento data={exames} />
          </Box.Content>
        </Box.Root>
      </div>
    </div>
  );
}
