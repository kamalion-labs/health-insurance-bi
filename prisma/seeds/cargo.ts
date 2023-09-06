import { PrismaClient } from "@prisma/client";
import { hrtime } from "process";

export async function insertCargos(prisma: PrismaClient) {
  const start = hrtime.bigint();
  
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

  const end = hrtime.bigint();
  console.info(`Cargos importados em: ${(end - start) / BigInt(10 ** 6)}ms`);
}
