import { PrismaClient } from "@prisma/client";

export async function insertCategorias(prisma: PrismaClient) {
  await prisma.categoria.createMany({
    data: [
      {
        id: 1,
        codigo: "internacao",
        nome: "Internação",
      },
      {
        id: 2,
        codigo: "exames",
        nome: "Exames",
      },
      {
        id: 3,
        codigo: "terapia",
        nome: "Terapia",
      },
      {
        id: 4,
        codigo: "ambulatoriais",
        nome: "Outros procedimentos ambulatoriais",
      },
      {
        id: 5,
        codigo: "consulta-eletiva",
        nome: "Consulta eletiva",
      },
      {
        id: 6,
        codigo: "pronto-socorro",
        nome: "Consulta em pronto socorro",
      },
    ],
  });
}
