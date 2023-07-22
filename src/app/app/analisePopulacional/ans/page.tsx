import { Box, PageInitializer } from "@/components";
import { Grafico } from "./Grafico";
import { prisma } from "@/lib/db/prisma";

async function calcularMedia(idCategoria: number) {
  const total = await prisma.evento.count({
    where: {
      procedimento: {
        idCategoria,
      },
    },
  });

  const listaConsultasPessoa = await prisma.evento.findMany({
    where: {
      procedimento: {
        idCategoria,
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

export default async function ANSPage() {
  const mediaConsultas = await calcularMedia(2);
  const mediaConsultasEletivas = await calcularMedia(3);
  const mediaConsultasPS = await calcularMedia(4);
  const mediaProcedimentos = await calcularMedia(5);
  const mediaOutros = await calcularMedia(6);
  const mediaTerapia = await calcularMedia(7);

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
