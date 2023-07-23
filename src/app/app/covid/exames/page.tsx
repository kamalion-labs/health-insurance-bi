import { Box, Card, PageInitializer } from "@/components";
import { prisma } from "@/lib/db/prisma";
import { TabelaExamesCovid } from "./TabelaExamesCovid";
import { Pessoa } from "@prisma/client";
import { differenceInYears } from "date-fns";
import { faker } from "@faker-js/faker";

export default async function Exames() {
  const tussCovid = ["40304906", "40302687", "28042000"];

  const eventos = await prisma.evento.findMany({
    include: {
      procedimento: true,
      pessoa: true,
    },
  });

  const examesCovid = eventos.filter((evento) =>
    tussCovid.includes(evento.procedimento.tuss)
  );

  const pessoas = examesCovid.reduce<Pessoa[]>((lista, evento) => {
    return [...lista, evento.pessoa];
  }, []);

  console.log(
    faker.date.betweens({
      from: "1960-01-01T00:00:00.000Z",
      to: new Date(),
    })[0]
  );

  return (
    <div className="space-y-5 p-4">
      <PageInitializer
        title="Detalhamento de pessoas que fizeram exames Covid-19"
        id="exame"
        parentId="covid"
      />

      <div className="grid grid-cols-4 gap-5">
        <Card.Root className="h-30">
          <Card.Title>Exames de Coronavírus</Card.Title>
          <Card.Value>{examesCovid.length}</Card.Value>
        </Card.Root>

        <Card.Root className="h-30">
          <Card.Title>Beneficiários atendidos Covid-19</Card.Title>
          <Card.Value>{examesCovid.length}</Card.Value>
        </Card.Root>

        <Card.Root className="h-30">
          <Card.Title>Idade média de quem fez exames</Card.Title>
          <Card.Value>
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

        <Card.Root className="h-30">
          <Card.Title>
            Beneficiários que fizeram exames e foram internados por Covid-19
          </Card.Title>
          <Card.Value>
            {examesCovid.filter((evento) => evento.teveInternacao).length}
          </Card.Value>
        </Card.Root>
      </div>

      <Box.Root>
        <Box.Title>Listagem Exames Covid</Box.Title>
        <Box.Content>
          <TabelaExamesCovid data={examesCovid} />
        </Box.Content>
      </Box.Root>
    </div>
  );
}
