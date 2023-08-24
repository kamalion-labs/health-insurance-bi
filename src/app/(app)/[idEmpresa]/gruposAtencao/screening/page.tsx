import { Box, Card, PageInitializer } from "@/components";
import { Tuss } from "@/lib/consts";
import { prisma } from "@/lib/db/prisma";
import { TabelaMamografia } from "./TabelaMamografia";
import { TabelaPapanicolau } from "./TabelaPapanicolau";
import { GraficoScreening } from "./GraficoScreening";

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
  const procedimentos = await prisma.procedimento.findMany({
    include: {
      eventos: {
        where: {
          pessoa: {
            idEmpresa: +idEmpresa,
          },
        },
      },
    },
  });

  const pessoas = await prisma.pessoa.findMany({
    include: {
      tipoTitularidade: true,
      eventos: {
        include: {
          procedimento: {
            include: {
              categoria: true,
            },
          },
        },
      },
    },
    where: {
      idEmpresa: +idEmpresa,
    },
  });

  const examesScreening = procedimentos.filter((procedimento) =>
    Tuss.tussScreening.includes(procedimento.tuss)
  );

  let totalScreenings = 0;
  examesScreening.forEach((procedimento) => {
    totalScreenings += procedimento.eventos.length;
  });

  return (
    <div className="space-y-5 p-4">
      <PageInitializer
        title="Exames de Rastreamento (Screening)"
        id="screening"
        parentId="gruposAtencao"
      />

      <div className="grid grid-cols-3 gap-5">
        <Card.Root>
          <Card.Title>Quantidade Total de Screenings realizados</Card.Title>
          <Card.Value>{totalScreenings}</Card.Value>
        </Card.Root>

        <Card.Root>
          <Card.Title>Quantidade de Mamografias realizadas</Card.Title>
          <Card.Value>
            {
              procedimentos.find(
                (procedimento) => procedimento.tuss === Tuss.tussMamografia
              )?.eventos.length
            }
          </Card.Value>
        </Card.Root>

        <Card.Root>
          <Card.Title>Quantidade de Exames Papanicolau realizados</Card.Title>
          <Card.Value>
            {
              procedimentos.find(
                (procedimento) => procedimento.tuss === Tuss.tussPapanicolau
              )?.eventos.length
            }
          </Card.Value>
        </Card.Root>
      </div>

      <Box.Root>
        <Box.Title>Exames de Screening</Box.Title>

        <Box.Content className="h-[450px] p-5">
          <GraficoScreening data={examesScreening} />
        </Box.Content>
      </Box.Root>

      <div className="grid grid-cols-2 gap-5">
        <Box.Root>
          <Box.Title>
            Lista de Beneficiárias que não realizaram Mamografia
          </Box.Title>

          <Box.Content>
            <TabelaMamografia
              data={pessoas.filter((pessoa) => pessoa.sexo === "F")}
            />
          </Box.Content>
        </Box.Root>

        <Box.Root>
          <Box.Title>
            Lista de Beneficiárias que não realizaram Papanicolau
          </Box.Title>

          <Box.Content>
            <TabelaPapanicolau
              data={pessoas.filter((pessoa) => pessoa.sexo === "F")}
            />
          </Box.Content>
        </Box.Root>
      </div>
    </div>
  );
}
