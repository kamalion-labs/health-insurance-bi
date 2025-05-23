import { Box, Card, PageInitializer } from "@/components";
import { Tuss } from "@/lib/consts";
import { prisma } from "@/lib/db/prisma";
import { Pessoa } from "@prisma/client";
import { differenceInYears } from "date-fns";
import {
  InternacoesTabela,
  TabelaInternacoesCovid,
} from "./TabelaInternacoesCovid";
import { GraficoInternacoesPorSexo } from "./GraficoInternacoesPorSexo";
import { GraficoInternacoesPorTitularidade } from "./GraficoInternacoesPorTitularidade";

type Props = {
  params: {
    idEmpresa: string;
  };
};

export async function generateStaticParams() {
  const empresas = await prisma.empresa.findMany();

  return empresas.map((empresa) => ({ idEmpresa: empresa.id.toString() }));
}

export default async function Internacao({ params: { idEmpresa } }: Props) {
  const eventos = await prisma.evento.findMany({
    include: {
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

  const internacoesCovid = eventos
    .filter((evento) => evento.teveInternacao)
    .filter((evento) => Tuss.tussCovid.includes(evento.procedimento.tuss));

  const pessoas = internacoesCovid.reduce<Pessoa[]>((lista, evento) => {
    return [...lista, evento.pessoa];
  }, []);

  const idadeMedia =
    pessoas.reduce(
      (sum, current) =>
        sum + differenceInYears(new Date(), current.dataNascimento!),
      0
    ) / pessoas.length;

  const tabelaInternacoes = internacoesCovid.map<InternacoesTabela>((exame) => {
    const nome = exame.pessoa.nome;
    const titularidade = exame.pessoa.tipoTitularidade.nome;
    const codigoProcedimento = exame.procedimento.tuss;
    const teveInternacao = exame.teveInternacao ? "Sim" : "Não";

    return {
      nome,
      dataRealizacao: exame.dataRealizacao,
      titularidade,
      codigoProcedimento,
      descricao: exame.descricao,
      quantidade: exame.quantidade,
      teveInternacao,
      custoTotal: exame.custoTotal,
    };
  });

  return (
    <div className="space-y-5 p-4">
      <PageInitializer
        title="Detalhamento de pessoas que foram Internadas Covid-19"
        id="covidInternacao"
        parentId="covid"
      />

      <div className="grid grid-cols-4 gap-5">
        <Card.Root className="h-30">
          <Card.Title>Internações de Coronavírus</Card.Title>
          <Card.Value>{internacoesCovid.length}</Card.Value>
        </Card.Root>

        <Card.Root className="h-30">
          <Card.Title>
            Quantidade de Beneficiários internados Covid-19
          </Card.Title>
          <Card.Value>{pessoas.length}</Card.Value>
        </Card.Root>

        <Card.Root className="h-30">
          <Card.Title>Idade média de quem foi internado</Card.Title>
          <Card.Value>
            {idadeMedia
              ? idadeMedia.toLocaleString("pt-br", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })
              : "Não há dados"}
          </Card.Value>
        </Card.Root>

        <Card.Root className="h-30">
          <Card.Title>
            Beneficiários que fizeram exames e foram internados por Covid-19
          </Card.Title>
          <Card.Value>{internacoesCovid.length}</Card.Value>
        </Card.Root>
      </div>

      <Box.Root>
        <Box.Title>Listagem de Internações de Covid</Box.Title>

        <Box.Content>
          <TabelaInternacoesCovid data={tabelaInternacoes} />
        </Box.Content>
      </Box.Root>

      <div className="grid grid-cols-2 gap-5">
        <Box.Root>
          <Box.Title>Quantidade de Internações de Covid-19 por Sexo</Box.Title>

          <Box.Content className="h-[300px]">
            <GraficoInternacoesPorSexo data={pessoas} />
          </Box.Content>
        </Box.Root>

        <Box.Root>
          <Box.Title>
            Quantidade de Internações de Covid-19 por Titularidade
          </Box.Title>

          <Box.Content className="h-[300px]">
            <GraficoInternacoesPorTitularidade data={pessoas} />
          </Box.Content>
        </Box.Root>
      </div>
    </div>
  );
}
