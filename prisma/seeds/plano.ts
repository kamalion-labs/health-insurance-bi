import { PrismaClient } from "@prisma/client";

export async function insertPlano(prisma: PrismaClient) {
  await prisma.plano.createMany({
    data: [
      {
        id: 1,
        nome: "Amil - Plano 1",
        idOperadora: 1,
      },
      {
        id: 2,
        nome: "Amil - Plano 2",
        idOperadora: 1,
      },
      {
        id: 3,
        nome: "Unimed - Plano 1",
        idOperadora: 2,
      },
    ],
  });
}
