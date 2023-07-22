import { PrismaClient } from "@prisma/client";

export async function insertCategorias(prisma: PrismaClient) {
  await prisma.categoria.createMany({
    data: [
      {
        id: 1,
        nome: "Internação",
      },
      {
        id: 2,
        nome: "Exames",
      },
      {
        id: 3,
        nome: "Terapia",
      },
      {
        id: 4,
        nome: "Outros procedimentos ambulatoriais",
      },
      {
        id: 5,
        nome: "Consulta eletiva",
      },
      {
        id: 6,
        nome: "Consulta em pronto socorro",
      },
    ],
  });
}
