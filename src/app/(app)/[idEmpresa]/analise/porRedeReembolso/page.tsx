import { Box, Money, PageInitializer } from "@/components";
import { prisma } from "@/lib/db/prisma";
import { GraficoRedeReembolso } from "./GraficoRedeReembolso";
import { GraficoRedeReembolsoCategoria } from "./GraficoRedeReembolsoCategoria";
import { Prisma } from "@prisma/client";

type Props = {
  params: {
    idEmpresa: string;
  };
};

export type EventosWithCategoria = Prisma.EventoGetPayload<{
  include: { procedimento: { include: { categoria: true } } };
}>;

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
      procedimento: {
        include: {
          categoria: true,
        },
      },
    },
  });

  return (
    <div className="space-y-3 p-4">
      <PageInitializer
        title="Por Rede e Reembolso"
        id="analisePorRedeReembolso"
        parentId="analise"
      />

      <Box.Root>
        <Box.Title>Gastos por Categoria de Procedimento</Box.Title>

        <Box.Content>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="flex flex-col items-center justify-center space-y-5 p-5">
              <div className="flex flex-col">
                <div className="text-center text-sm">
                  Valor Total de Reembolso
                </div>
                <div className="text-5xl font-extralight text-primary">
                  <Money
                    value={eventos.reduce(
                      (sum, current) =>
                        current.reembolso ? sum + current.custoTotal : sum,
                      0
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <div className="text-center text-sm">Valor Total da Rede</div>
                <div className="text-5xl font-extralight text-primary">
                  <Money
                    value={eventos.reduce(
                      (sum, current) =>
                        !current.reembolso ? sum + current.custoTotal : sum,
                      0
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="h-[350px]">
              <GraficoRedeReembolso data={eventos} />
            </div>
          </div>
        </Box.Content>
      </Box.Root>

      <Box.Root>
        <Box.Title>Valor Médio de rede/reembolso por categoria</Box.Title>

        <Box.Content className="h-[450px]">
          <GraficoRedeReembolsoCategoria data={eventos} />
        </Box.Content>
      </Box.Root>
    </div>
  );
}
