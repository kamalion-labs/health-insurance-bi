import { PrismaClient } from "@prisma/client";

export async function insertUsuarios(prisma: PrismaClient) {
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
}
