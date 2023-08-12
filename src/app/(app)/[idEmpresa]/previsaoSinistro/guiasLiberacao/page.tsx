import { Box, PageInitializer } from "@/components";
import { prisma } from "@/lib/db/prisma";
import { GraficoLiminar } from "./GraficoLiminar";
import { GraficoSituacaoSenha } from "./GraficoSituacaoSenha";
import { GraficoPorCompetenciaPrestador } from "./GraficoPorCompetenciaPrestador";
import { GraficoPorCompetenciaPlano } from "./GraficoPorCompetenciaPlano";

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
  // vou corrigir essa busca e filtro por empresa, aparentemente ainda não funcionou
  const liberacoes = await prisma.liberacao.findMany({
    include: {
      prestador: {
        include: {
          eventos: {
            include: {
              pessoa: true,
            },
            where: {
              pessoa: {
                idEmpresa: +idEmpresa,
              },
            },
          },
        },
      },
      plano: true,
    },
    orderBy: {
      dataSolicitacao: "asc",
    },
  });

  const prestadores = await prisma.prestador.findMany({
    include: {
      eventos: {
        include: {
          pessoa: true,
        },
        where: {
          pessoa: {
            idEmpresa: +idEmpresa,
          },
        },
      },
    },
  });

  const planos = await prisma.plano.findMany({
    include: {
      pessoas: true,
    },
  });

  // const liberacoes2 = await prisma.liberacao.findMany({
  //   include: {
  //     plano: {
  //       include: {
  //         operadora: {
  //           include: {
  //             empresaOperadora: {
  //               include: {
  //                 empresa: {
  //                   include: {
  //                     pessoas: {
  //                       where: {
  //                         idEmpresa: +idEmpresa,
  //                       },
  //                     },
  //                   },
  //                 },
  //               },
  //               // where: {
  //               //   empresa: {
  //               //     id: +idEmpresa,
  //               //   },
  //               // },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   },
  // });

  return (
    <div className="space-y-5 p-5">
      <PageInitializer
        title="Guias de Liberação"
        id="guiasLiberacao"
        parentId="previsaoSinistro"
      />

      <div className="grid grid-cols-2 gap-5">
        <Box.Root>
          <Box.Title>Liberações Totais por Liminar</Box.Title>

          <Box.Content className="h-[300px]">
            <GraficoLiminar data={liberacoes} />
          </Box.Content>
        </Box.Root>

        <Box.Root>
          <Box.Title>Liberações Totais por Situação da Senha</Box.Title>

          <Box.Content className="h-[300px]">
            <GraficoSituacaoSenha data={liberacoes} />
          </Box.Content>
        </Box.Root>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <Box.Root>
          <Box.Title>Liberações por Competência e Prestador</Box.Title>

          <Box.Content className="h-[300px]">
            <GraficoPorCompetenciaPrestador
              data={liberacoes}
              prestadores={prestadores}
            />
          </Box.Content>
        </Box.Root>

        <Box.Root>
          <Box.Title>Liberações por Competência e Plano</Box.Title>

          <Box.Content className="h-[300px]">
            <GraficoPorCompetenciaPlano data={liberacoes} planos={planos} />
          </Box.Content>
        </Box.Root>
      </div>
    </div>
  );
}
