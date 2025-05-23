import { Box, PageInitializer } from "@/components";
import { Grafico } from "./Grafico";
import { prisma } from "@/lib/db/prisma";

type Props = {
  params: {
    idEmpresa: string;
  };
};

export async function generateStaticParams() {
  const empresas = await prisma.empresa.findMany();

  return empresas.map((empresa) => ({ idEmpresa: empresa.id.toString() }));
}

async function calcularMedia(idCategoria: number, idEmpresa: string) {
  const total = await prisma.evento.count({
    where: {
      procedimento: {
        idCategoria,
      },
      pessoa: {
        idEmpresa: +idEmpresa,
      },
    },
  });

  const listaConsultasPessoa = await prisma.evento.findMany({
    where: {
      procedimento: {
        idCategoria,
      },
      pessoa: {
        idEmpresa: +idEmpresa,
      },
    },
    include: {
      pessoa: true,
    },
    distinct: "idPessoa",
  });

  const qntPessoas = listaConsultasPessoa.length;

  return total / qntPessoas;
}

export default async function ANSPage({ params: { idEmpresa } }: Props) {
  const mediaConsultas = await calcularMedia(2, idEmpresa);
  const mediaConsultasEletivas = await calcularMedia(3, idEmpresa);
  const mediaConsultasPS = await calcularMedia(4, idEmpresa);
  const mediaProcedimentos = await calcularMedia(5, idEmpresa);
  const mediaOutros = await calcularMedia(6, idEmpresa);
  const mediaTerapia = await calcularMedia(7, idEmpresa);

  const mediaANS = {
    consultas: 5.35,
    consultasEletivas: 3.7,
    consultasPS: 1,
    procedimentos: 16.9,
    outros: 3,
    terapias: 0.9,
  };

  return (
    <div className="space-y-5 p-4">
      <PageInitializer
        title="Indicadores comparativos de utilização ANS"
        id="analisePopulacionalANS"
        parentId="analisePopulacional"
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <Box.Root>
          <Box.Title>Exames por Beneficiário</Box.Title>

          <Box.Content className="h-[300px]">
            <Grafico
              mediaANS={mediaANS.procedimentos}
              data={[
                {
                  Item: 1,
                  Total: mediaProcedimentos,
                  TotalColor: "#5B93FF",
                },
              ]}
            />
          </Box.Content>
        </Box.Root>

        <Box.Root>
          <Box.Title>Consultas por Beneficiário</Box.Title>

          <Box.Content className="h-[300px]">
            <Grafico
              mediaANS={mediaANS.consultas}
              data={[
                {
                  Item: 2,
                  Total: mediaConsultas,
                  TotalColor: "#5B93FF",
                },
              ]}
            />
          </Box.Content>
        </Box.Root>

        <Box.Root>
          <Box.Title>Consultas Eletivas por Beneficiário</Box.Title>

          <Box.Content className="h-[300px]">
            <Grafico
              mediaANS={mediaANS.consultasEletivas}
              data={[
                {
                  Item: 2,
                  Total: mediaConsultasEletivas,
                  TotalColor: "#5B93FF",
                },
              ]}
            />
          </Box.Content>
        </Box.Root>

        <Box.Root>
          <Box.Title>Terapias por Beneficiários</Box.Title>

          <Box.Content className="h-[300px]">
            <Grafico
              mediaANS={mediaANS.terapias}
              data={[
                {
                  Item: 2,
                  Total: mediaTerapia,
                  TotalColor: "#5B93FF",
                },
              ]}
            />
          </Box.Content>
        </Box.Root>

        <Box.Root>
          <Box.Title>Consultas em PS por Beneficiário</Box.Title>

          <Box.Content className="h-[300px]">
            <Grafico
              mediaANS={mediaANS.consultasPS}
              data={[
                {
                  Item: 2,
                  Total: mediaConsultasPS,
                  TotalColor: "#5B93FF",
                },
              ]}
            />
          </Box.Content>
        </Box.Root>

        <Box.Root>
          <Box.Title>
            Outros Procedimentos Ambulatoriais por Beneficiário
          </Box.Title>

          <Box.Content className="h-[300px]">
            <Grafico
              mediaANS={mediaANS.outros}
              data={[
                {
                  Item: 2,
                  Total: mediaOutros,
                  TotalColor: "#5B93FF",
                },
              ]}
            />
          </Box.Content>
        </Box.Root>
      </div>
    </div>
  );
}
