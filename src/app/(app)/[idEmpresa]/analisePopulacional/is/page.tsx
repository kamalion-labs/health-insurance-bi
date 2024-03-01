import { Box, Card, PageInitializer } from "@/components";
import { prisma } from "@/lib/db/prisma";
import { differenceInYears } from "date-fns";
import { GraficoSexoFaixaEtaria } from "./GraficoSexoFaixaEtaria";
import { GraficoTitularidade } from "./GraficoTitularidade";
import { GraficoSexo } from "./GraficoSexo";
import { GraficoUsuariosMes } from "./GraficoUsuariosMes";
import { EventoRepositorio } from "@/lib/evento/repositorio/EventoRepositorio";
import { Filters } from "@/components/Filters";
import { useFiltro } from "@/stores";

type Props = {
  params: {
    idEmpresa: string;
  };
};

export async function generateStaticParams() {
  const empresas = await prisma.empresa.findMany();

  return empresas.map((empresa) => ({ idEmpresa: empresa.id.toString() }));
}

export default async function ISPage({ params: { idEmpresa } }: Props) {
  const pessoas = await prisma.pessoa.findMany({
    where: {
      idEmpresa: +idEmpresa,
    },
  });
  const eventos = await EventoRepositorio.listar(idEmpresa);

  const masculinos = pessoas.filter((x) => x.sexo === "M");
  const femininos = pessoas.filter((x) => x.sexo === "F");

  return (
    <div className="space-y-5 p-4">
      <PageInitializer
        title="Indicadores Sociodemográficos"
        id="analisePopulacionalIS"
        parentId="analisePopulacional"
      />

      {/* Header */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        <Card.Root>
          <Card.Title>Total de Usuários</Card.Title>
          <Card.Value className="flex flex-col">{pessoas.length}</Card.Value>
        </Card.Root>

        <Card.Root>
          <Card.Title>Idade Média dos Usuários</Card.Title>
          <Card.Value className="flex flex-col">
            {(
              pessoas.reduce(
                (sum, current) =>
                  sum + differenceInYears(new Date(), current.dataNascimento!),
                0
              ) / pessoas.length
            ).toLocaleString("pt-br", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </Card.Value>
        </Card.Root>

        <Card.Root>
          <Card.Title>Idade Média Usuários Masculinos</Card.Title>
          <Card.Value className="flex flex-col">
            {(
              masculinos.reduce(
                (sum, current) =>
                  sum + differenceInYears(new Date(), current.dataNascimento!),
                0
              ) / masculinos.length
            ).toLocaleString("pt-br", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </Card.Value>
        </Card.Root>

        <Card.Root>
          <Card.Title>Idade Média Usuários Femininos</Card.Title>
          <Card.Value className="flex flex-col">
            {(
              femininos.reduce(
                (sum, current) =>
                  sum + differenceInYears(new Date(), current.dataNascimento!),
                0
              ) / femininos.length
            ).toLocaleString("pt-br", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </Card.Value>
        </Card.Root>
      </div>

      {/* Gráfico 1 */}
      <div className="grid grid-cols-1 gap-5">
        <Box.Root>
          <Box.Title>Distribuição por Sexo e Faixa Etária</Box.Title>

          <Box.Content className="h-[300px]">
            <GraficoSexoFaixaEtaria data={pessoas} />
          </Box.Content>
        </Box.Root>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Box.Root>
          <Box.Title>Quantidade de Usuários por Titularidade</Box.Title>

          <Box.Content className="h-[300px]">
            <GraficoTitularidade data={pessoas} />
          </Box.Content>
        </Box.Root>

        <Box.Root>
          <Box.Title>Quantidade de Usuários por Sexo</Box.Title>

          <Box.Content className="h-[300px]">
            <GraficoSexo data={pessoas} />
          </Box.Content>
        </Box.Root>
      </div>

      <div className="grid grid-cols-1 gap-5">
        <Box.Root>
          <Box.Title>Quantidade de Usuários por Mês</Box.Title>

          <Box.Content>
            <div className="px-4">
              <Filters hideCategorias />
            </div>

          <div className="h-[300px]">
            <GraficoUsuariosMes data={eventos} />
            </div>
          </Box.Content>
        </Box.Root>
      </div>
    </div>
  );
}
