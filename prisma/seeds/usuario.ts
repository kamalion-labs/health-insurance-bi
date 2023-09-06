import { PrismaClient } from "@prisma/client";
import { hrtime } from "process";

export async function insertUsuarios(prisma: PrismaClient) {
  const start = hrtime.bigint();
  
  await prisma.usuario.upsert({
    where: {
      id: 1,
    },
    update: {},
    create: {
      email: "teste",
      nome: "Teste",
      senha: "$2a$12$2HJtS//cfUU1FC0GLf7sUu4gizRszmfgVsLUOu3vDW7MsAboJ4aRa",
      admin: true,
    },
  });

  const end = hrtime.bigint();
  console.info(`Usuários importados em: ${(end - start) / BigInt(10 ** 6)}ms`);
}
