import { PrismaClient } from "@prisma/client";
import { hrtime } from "process";

export async function insertPlano(prisma: PrismaClient) {
  const start = hrtime.bigint();
  
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

  const end = hrtime.bigint();
  console.info(`Planos importados em: ${(end - start) / BigInt(10 ** 6)}ms`);
}
