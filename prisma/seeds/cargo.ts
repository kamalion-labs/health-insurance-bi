import { prisma } from "@/lib/db/prisma";

export async function insertCargos() {
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
