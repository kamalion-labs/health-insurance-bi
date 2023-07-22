import { prisma } from "@/lib/db/prisma";

export async function insertOperadora() {
  await prisma.operadora.upsert({
    where: {
      id: 1,
    },
    update: {},
    create: {
      nome: "Amil",
    },
  });
}
