import { Box, Card, PageInitializer } from "@/components";
import { GraficoCustoTotal } from "./GraficoCustoTotal";
import { prisma } from "@/lib/db/prisma";
import { TabelaExamesCovid } from "./TabelaExamesCovid";

export default async function CovidDashboard() {
  const cidsCovid = ["A00", "A01"]; // Preencher com CIDs de covid

  const cidsSRAG = ["B34"]; // Preencher com CIDs de SRAG (Síndrome Respiratória Aguda Grave)

  // TUSS - Terminologia Unificada da Saúde Suplementar
  const tussCovid = ["40304906", "40302687", "28042000"];

  const tussSRAG = ["40302016", "40323676", "40404153"];

  const cids = await prisma.cid.findMany({
    include: {
      eventos: true,
    },
  });

  const procedimentos = await prisma.procedimento.findMany({
    include: {
      eventos: {
        include: {
          CID: true,
        },
      },
    },
  });

  const eventos = await prisma.evento.findMany({
    include: {
      CID: true,
      procedimento: true,
    },
  });

  const eventosCovid = procedimentos.flatMap((procedimento) =>
    procedimento.eventos.filter((evento) => {
      const hasCidCovid = cidsCovid.includes(evento.CID.codigo);
      const hasTussCovid = tussCovid.includes(procedimento.tuss);
      return hasCidCovid || hasTussCovid;
    })
  );

  return (
    <div className="space-y-5 p-4">
      <PageInitializer
        title="Dashboard Covid-19"
        id="covidDashboard"
        parentId="covid"
      />

      <div className="grid grid-cols-3 gap-5">
        <Card.Root>
          <Card.Title>Exames de Coronavírus</Card.Title>
          <Card.Value>
            {
              eventos.filter((evento) =>
                tussCovid.includes(evento.procedimento.tuss)
              ).length
            }
          </Card.Value>
        </Card.Root>

        <Card.Root>
          <Card.Title>Internação de Coronavírus</Card.Title>
          <Card.Value>
            {
              // Filtra eventos que possuem internação e depois eventos que possuem CID de covid.
              eventos
                .filter((evento) => evento.teveInternacao)
                .filter((evento) => cidsCovid.includes(evento.CID.codigo))
                .length
            }
          </Card.Value>
        </Card.Root>

        <Card.Root>
          <Card.Title>Procedimentos com CID de Coronavírus</Card.Title>
          <Card.Value>
            {
              eventos.filter((evento) => cidsCovid.includes(evento.CID.codigo))
                .length
            }
          </Card.Value>
        </Card.Root>
      </div>

      <div className="grid grid-cols-3 gap-5">
        <Card.Root>
          <Card.Title>Exames de Síndrome Respiratória</Card.Title>
          <Card.Value>
            {
              eventos.filter((evento) =>
                tussSRAG.includes(evento.procedimento.tuss)
              ).length
            }
          </Card.Value>
        </Card.Root>

        <Card.Root>
          <Card.Title>Internação de SRAG</Card.Title>
          <Card.Value>
            {
              // Filtra eventos que possuem internação e depois eventos que possuem CID de SRAG.
              eventos
                .filter((evento) => evento.teveInternacao)
                .filter((evento) => cidsSRAG.includes(evento.CID.codigo)).length
            }
          </Card.Value>
        </Card.Root>

        <Card.Root>
          <Card.Title>Procedimentos com CID de SRAG</Card.Title>
          <Card.Value>
            {
              eventos.filter((evento) => cidsSRAG.includes(evento.CID.codigo))
                .length
            }
          </Card.Value>
        </Card.Root>
      </div>

      <Card.Root>
        <Card.Title>Impacto Custo Total Covid-19</Card.Title>
        <Card.Value>
          {eventosCovid.reduce((sum, evento) => sum + evento.custoTotal, 0)}
        </Card.Value>
      </Card.Root>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Gráfico 1 */}
        <Box.Root>
          <Box.Title>Impacto Custo Total Covid-19</Box.Title>

          <Box.Content className="h-[300px]">
            <GraficoCustoTotal data={cids} />
          </Box.Content>
        </Box.Root>

        {/* Gráfico 2 */}
        <Box.Root>
          <Box.Title>
            Beneficiários que fizeram exames e foram internados por Covid-19
          </Box.Title>

          <Box.Content className="h-[300]">.</Box.Content>
        </Box.Root>
      </div>

      <Box.Root>
        <Box.Title>Listagem Exames Covid</Box.Title>

        <Box.Content>
          <TabelaExamesCovid data={eventos} />
        </Box.Content>
      </Box.Root>

      <Box.Root>
        <Box.Title>Listagem Exames SRAG</Box.Title>

        <Box.Content>.</Box.Content>
      </Box.Root>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Box.Root>
          <Box.Title>Tabela Comparativa</Box.Title>
        </Box.Root>

        <Box.Root>
          <Box.Title>Tabela Comparativa</Box.Title>
        </Box.Root>
      </div>
    </div>
  );
}
