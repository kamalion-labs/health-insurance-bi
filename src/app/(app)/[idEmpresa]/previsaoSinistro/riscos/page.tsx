import { Box, Card, PageInitializer } from "@/components";
import { prisma } from "@/lib/db/prisma";
import { TabelaRiscoDM } from "./TabelaRiscoDM";
import { Prisma } from "@prisma/client";
import { TabelaRiscoHAS } from "./TabelaRiscoHAS";

type Props = {
  params: {
    idEmpresa: string;
  };
};

export async function generateStaticParams() {
  const empresas = await prisma.empresa.findMany();

  return empresas.map((empresa) => ({ idEmpresa: empresa.id.toString() }));
}

export type PessoaWithTitularidade = Prisma.PessoaGetPayload<{
  include: {
    tipoTitularidade: true;
  };
}>;

export default async function Page({ params: { idEmpresa } }: Props) {
  const pessoas = await prisma.pessoa.findMany({
    where: {
      idEmpresa: +idEmpresa,
    },
    include: {
      tipoTitularidade: true,
    },
  });

  const pessoasMasculino = pessoas.filter((pessoa) => pessoa.sexo === "M");

  const pessoasFeminino = pessoas.filter((pessoa) => pessoa.sexo === "F");

  return (
    <div className="space-y-5 p-5">
      <PageInitializer
        title="Risco DM e HAS"
        id="risco"
        parentId="previsaoSinistro"
      />

      <div className="grid grid-cols-2 gap-5">
        <Card.Root>
          <Card.Title>Score Médio DM</Card.Title>
          <Card.Value>
            {(
              pessoas.reduce(
                (sum, current) => sum + current.scoreDiabetes!,
                0
              ) / pessoas.length
            ).toFixed(2)}
          </Card.Value>
        </Card.Root>

        <Card.Root>
          <Card.Title>Score Médio HAS</Card.Title>
          <Card.Value>
            {(
              pessoas.reduce(
                (sum, current) => sum + current.scoreHipertensao!,
                0
              ) / pessoas.length
            ).toFixed(2)}
          </Card.Value>
        </Card.Root>
      </div>

      <div className="grid grid-cols-4 gap-5">
        <Card.Root>
          <Card.Title>Score Médio DM Masculinos</Card.Title>
          <Card.Value>
            {(
              pessoasMasculino.reduce(
                (sum, current) => sum + current.scoreDiabetes!,
                0
              ) / pessoas.length
            ).toFixed(2)}
          </Card.Value>
        </Card.Root>

        <Card.Root>
          <Card.Title>Score Médio DM Femininos</Card.Title>
          <Card.Value>
            {(
              pessoasFeminino.reduce(
                (sum, current) => sum + current.scoreDiabetes!,
                0
              ) / pessoas.length
            ).toFixed(2)}
          </Card.Value>
        </Card.Root>

        <Card.Root>
          <Card.Title>Score Médio HAS Masculinos</Card.Title>
          <Card.Value>
            {(
              pessoasMasculino.reduce(
                (sum, current) => sum + current.scoreHipertensao!,
                0
              ) / pessoas.length
            ).toFixed(2)}
          </Card.Value>
        </Card.Root>

        <Card.Root>
          <Card.Title>Score Médio HAS Femininos</Card.Title>
          <Card.Value>
            {(
              pessoasFeminino.reduce(
                (sum, current) => sum + current.scoreHipertensao!,
                0
              ) / pessoas.length
            ).toFixed(2)}
          </Card.Value>
        </Card.Root>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <Box.Root>
          <Box.Title>Quantidade por Risco DM</Box.Title>

          <Box.Content>{"."}</Box.Content>
        </Box.Root>

        <Box.Root>
          <Box.Title>Quantidade por Risco HAS</Box.Title>

          <Box.Content>{"."}</Box.Content>
        </Box.Root>
      </div>

      <Box.Root>
        <Box.Title>Risco de Diabetes Mellitus</Box.Title>

        <Box.Content>
          <TabelaRiscoDM pessoas={pessoas} />
        </Box.Content>
      </Box.Root>

      <Box.Root>
        <Box.Title>Risco de Hipertensão Arterial Sistêmica</Box.Title>

        <Box.Content>
          <TabelaRiscoHAS pessoas={pessoas} />
        </Box.Content>
      </Box.Root>
    </div>
  );
}
