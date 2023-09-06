import { PrismaClient } from "@prisma/client";
import { hrtime } from "process";

export async function insertPrestadores(prisma: PrismaClient) {
  const start = hrtime.bigint();
  
  await prisma.prestador.createMany({
    data: [
      {
        id: 1,
        nome: "Hospital HSP",
        UF: "DF",
        hospital: true,
      },
      {
        id: 2,
        nome: "Clínica CLN",
        UF: "SP",
        hospital: false,
      },
      {
        id: 3,
        nome: "Laboratório LBR",
        UF: "DF",
        hospital: false,
      },
      {
        id: 4,
        nome: "Hospital HRM",
        UF: "MG",
        hospital: true,
      },
    ],
  });

  const end = hrtime.bigint();
  console.info(`Prestadores importados em: ${(end - start) / BigInt(10 ** 6)}ms`);
}
