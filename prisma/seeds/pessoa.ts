import { prisma } from "@/lib/db/prisma";
import { faker } from "@faker-js/faker";

export async function insertPessoas() {
  await prisma.pessoa.upsert({
    where: {
      id: 1,
    },
    update: {},
    create: {
      nome: faker.person.fullName(),
      CPF: "123",
      idCargo: 1,
    },
  });
}
