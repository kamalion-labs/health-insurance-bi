import { prisma } from "@/lib/db/prisma";

export async function insertCargos() {
  await prisma.setor.upsert({
    where: {
      id: 1,
    },
    update: {},
    create: {
      nome: "Setor 1",
    },
  });

  await prisma.cargo.upsert({
    where: {
      id: 1,
    },
    update: {},
    create: {
      idSetor: 1,
      nome: "Cargo 1",
    },
  });
}
