import { prisma } from "@/lib/db/prisma";

export async function insertCategorias() {
  await prisma.especialidade.createMany({
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
    skipDuplicates: true,
  });
}
