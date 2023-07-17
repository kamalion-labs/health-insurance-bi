import { Box, Card, PageInitializer } from "@/components";
import { prisma } from "@/lib/db/prisma";
import { differenceInYears } from "date-fns";
import { GraficoSexoFaixaEtaria } from "./GraficoSexoFaixaEtaria";
import { GraficoTitularidade } from "./GraficoTitularidade";
import { GraficoSexo } from "./GraficoSexo";

export default async function ISPage() {
  const data = await prisma.pessoa.findMany();

  const masculinos = data.filter((x) => x.sexo === "M");
  const femininos = data.filter((x) => x.sexo === "F");

  return (
    <div className="space-y-5 p-4">
      <PageInitializer
        title="Indicadores Sociodemográficos"
        id="analisePopulacionalIS"
        parentId="analisePopulacional"
      />

      {/* Header */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
        <Card.Root>
          <Card.Title>Total de Usuários</Card.Title>
          <Card.Value className="flex flex-col">{data.length}</Card.Value>
        </Card.Root>

        <Card.Root>
          <Card.Title>Idade Média dos Usuários</Card.Title>
          <Card.Value className="flex flex-col">
            {data.reduce(
              (sum, current) =>
                sum + differenceInYears(new Date(), current.dataNascimento!),
              0
            ) / data.length}
          </Card.Value>
        </Card.Root>

        <Card.Root>
          <Card.Title>Idade Média Usuários Masculinos</Card.Title>
          <Card.Value className="flex flex-col">
            {masculinos.reduce(
              (sum, current) =>
                sum + differenceInYears(new Date(), current.dataNascimento!),
              0
            ) / data.filter((x) => x.sexo === "M").length}
          </Card.Value>
        </Card.Root>

        <Card.Root>
          <Card.Title>Idade Média Usuários Femininos</Card.Title>
          <Card.Value className="flex flex-col">
            {femininos.reduce(
              (sum, current) =>
                sum + differenceInYears(new Date(), current.dataNascimento!),
              0
            ) / data.filter((x) => x.sexo === "F").length}
          </Card.Value>
        </Card.Root>
      </div>

      {/* Gráfico 1 */}
      <Box.Root>
        <Box.Title>Distribuição por Sexo e Faixa Etária</Box.Title>

        <Box.Content className="h-[300px]">
          <GraficoSexoFaixaEtaria data={data} />
        </Box.Content>
      </Box.Root>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Box.Root>
          <Box.Title>Quantidade de Usuários por Titularidade</Box.Title>

          <Box.Content className="h-[300px]">
            <GraficoTitularidade data={data} />
          </Box.Content>
        </Box.Root>

        <Box.Root>
          <Box.Title>Quantidade de Usuários por Sexo</Box.Title>

          <Box.Content className="h-[300px]">
            <GraficoSexo data={data} />
          </Box.Content>
        </Box.Root>
      </div>
    </div>
  );
}
