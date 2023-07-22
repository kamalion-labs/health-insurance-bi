import { prisma } from "@/lib/db/prisma";

export async function insertEmpresa() {
  await prisma.empresa.upsert({
    where: {
      id: 1,
    },
    update: {},
    create: {
      nome: "Empresa 1",
      CNPJ: "123456",
    },
  });
}
