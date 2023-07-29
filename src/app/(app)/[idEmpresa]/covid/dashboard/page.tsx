import { Box, Card, Money, PageInitializer } from "@/components";
import { GraficoCustoTotal } from "./GraficoCustoTotal";
import { prisma } from "@/lib/db/prisma";
import { TabelaExamesCovid } from "./TabelaExamesCovid";
import { TabelaExamesSRAG } from "./TabelaExamesSRAG";
import { Cids, Tuss } from "@/lib/consts";

type Props = {
  params: {
    idEmpresa: string;
  };
};

export async function generateStaticParams() {
  const empresas = await prisma.empresa.findMany();

  return empresas.map((empresa) => ({ idEmpresa: empresa.id.toString() }));
}

export default async function CovidDashboard({ params: { idEmpresa } }: Props) {
  const eventos = await prisma.evento.findMany({
    include: {
      CID: true,
      procedimento: true,
      pessoa: {
        include: {
          tipoTitularidade: true,
        },
      },
    },
    where: {
      pessoa: {
        idEmpresa: +idEmpresa,
      },
    },
  });

  const eventosCovid = eventos.filter((evento) => {
    const hasCidCovid = Cids.cidsCovid.includes(evento.CID?.codigo!);
    const hasTussCovid = Tuss.tussCovid.includes(evento.procedimento.tuss);
    return hasCidCovid || hasTussCovid;
  });

  const examesCovid = eventos.filter((evento) =>
    Tuss.tussCovid.includes(evento.procedimento.tuss)
  );

  const examesSRAG = eventos.filter((evento) =>
    Tuss.tussSRAG.includes(evento.procedimento.tuss)
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
          <Card.Value>{examesCovid.length}</Card.Value>
        </Card.Root>

        <Card.Root>
          <Card.Title>Internação de Coronavírus</Card.Title>
          <Card.Value>
            {
              // Filtra eventos que possuem internação e depois eventos que possuem CID de covid.
              eventos
                .filter((evento) => evento.teveInternacao)
                .filter((evento) =>
                  Cids.cidsCovid.includes(evento.CID?.codigo!)
                ).length
            }
          </Card.Value>
        </Card.Root>

        <Card.Root>
          <Card.Title>Procedimentos com CID de Coronavírus</Card.Title>
          <Card.Value>
            {
              eventos.filter((evento) =>
                Cids.cidsCovid.includes(evento.CID?.codigo!)
              ).length
            }
          </Card.Value>
        </Card.Root>
      </div>

      <div className="grid grid-cols-3 gap-5">
        <Card.Root>
          <Card.Title>Exames de Síndrome Respiratória</Card.Title>
          <Card.Value>{examesSRAG.length}</Card.Value>
        </Card.Root>

        <Card.Root>
          <Card.Title>Internação de SRAG</Card.Title>
          <Card.Value>
            {
              // Filtra eventos que possuem internação e depois eventos que possuem CID de SRAG.
              eventos
                .filter((evento) => evento.teveInternacao)
                .filter((evento) => Cids.cidsSRAG.includes(evento.CID?.codigo!))
                .length
            }
          </Card.Value>
        </Card.Root>

        <Card.Root>
          <Card.Title>Procedimentos com CID de SRAG</Card.Title>
          <Card.Value>
            {
              eventos.filter((evento) =>
                Cids.cidsSRAG.includes(evento.CID?.codigo!)
              ).length
            }
          </Card.Value>
        </Card.Root>
      </div>

      <Card.Root>
        <Card.Title>Impacto Custo Total Covid-19</Card.Title>
        <Card.Value>
          <Money
            value={eventosCovid.reduce(
              (sum, evento) => sum + evento.custoTotal,
              0
            )}
          />
        </Card.Value>
      </Card.Root>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Gráfico 1 */}
        <Box.Root>
          <Box.Title>Impacto Custo Total Covid-19</Box.Title>

          <Box.Content className="h-[300px]">
            <GraficoCustoTotal data={eventos} />
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
          <TabelaExamesCovid data={examesCovid} />
        </Box.Content>
      </Box.Root>

      <Box.Root>
        <Box.Title>Listagem Exames SRAG</Box.Title>

        <Box.Content>
          <TabelaExamesSRAG data={examesSRAG} />
        </Box.Content>
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
