import { PrismaClient } from "@prisma/client";

export async function insertCargos(prisma: PrismaClient) {
  await prisma.setor.create({
    data: {
      id: 1,
      nome: "Setor 1",
    },
  });

  await prisma.cargo.createMany({
    data: [
      {
        id: 1,
        nome: "Cargo 1",
        idSetor: 1,
      },
      {
        id: 2,
        nome: "Cargo 2",
        idSetor: 1,
      },
    ],
  });
}
