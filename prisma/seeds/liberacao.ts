import { PrismaClient } from "@prisma/client";
import { importacaoLiberacoes } from "./importWorkers/importacaoLiberacoes";

export async function insertLiberacoes(prisma: PrismaClient) {
  await importacaoLiberacoes(prisma);
}
