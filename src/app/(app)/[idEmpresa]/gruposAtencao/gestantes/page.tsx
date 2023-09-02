import { Box, Card, PageInitializer } from "@/components";
import { Tuss } from "@/lib/consts";
import { prisma } from "@/lib/db/prisma";
import { TabelaGravidez } from "./TabelaGravidez";
import { TabelaParto } from "./TabelaParto";
import { GraficoRisco } from "./GraficoRisco";

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
  const pessoas = await prisma.pessoa.findMany({
    where: {
      idEmpresa: +idEmpresa,
    },
    include: {
      tipoTitularidade: true,
      eventos: {
        include: {
          procedimento: true,
        },
        orderBy: {
          dataRealizacao: "asc",
        },
      },
    },
  });

  const eventos = await prisma.evento.findMany({
    include: {
      procedimento: true,
    },
    where: {
      pessoa: {
        idEmpresa: +idEmpresa,
      },
    },
  });

  const mulheres = pessoas.filter((pessoa) => pessoa.sexo === "F");

  const mulheresGravidas = mulheres.filter((pessoa) => {
    const eventosDeGravidez = pessoa.eventos.filter((evento) =>
      Tuss.tussGravidez.includes(evento.procedimento.tuss)
    );
    return eventosDeGravidez.length > 0;
  });

  const eventosDeGravidez = eventos.filter((evento) =>
    Tuss.tussGravidez.includes(evento.procedimento.tuss)
  );

  return (
    <div className="space-y-5 p-4">
      <PageInitializer
        title="Prováveis Gestantes"
        id="gestantes"
        parentId="gruposAtencao"
      />

      <div className="grid grid-cols-3 gap-5">
        <Card.Root>
          <Card.Title>Quantidade total de mulheres</Card.Title>
          <Card.Value>
            {pessoas.filter((pessoa) => pessoa.sexo === "F").length}
          </Card.Value>
        </Card.Root>

        <Card.Root>
          <Card.Title>Quantidade total de mulheres grávidas</Card.Title>
          <Card.Value>{mulheresGravidas.length}</Card.Value>
        </Card.Root>

        <Card.Root>
          <Card.Title>Probabilidade de ocorrência de gestantes</Card.Title>
          <Card.Value>
            {((mulheresGravidas.length / mulheres.length) * 100).toLocaleString(
              "pt-BR",
              { minimumFractionDigits: 2 }
            )}
            %
          </Card.Value>
        </Card.Root>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <Box.Root>
          <Box.Title>
            Quantidade de Procedimentos de Gravidez por Risco
          </Box.Title>

          <Box.Content className="h-[250px]">
            <GraficoRisco data={eventosDeGravidez} />
          </Box.Content>
        </Box.Root>

        <Box.Root>
          <Box.Title>Quantidade de Partos realizados por Risco</Box.Title>

          <Box.Content className="h-[250px]">;</Box.Content>
        </Box.Root>
      </div>

      <Box.Root>
        <Box.Title>
          Mulheres que realizaram procedimentos de gravidez nos últimos 9 meses
        </Box.Title>

        <Box.Content>
          <TabelaGravidez data={mulheresGravidas} />
        </Box.Content>
      </Box.Root>

      <Box.Root>
        <Box.Title>Histórico de Partos realizados</Box.Title>

        <Box.Content>
          <TabelaParto data={mulheresGravidas} />
        </Box.Content>
      </Box.Root>
    </div>
  );
}
