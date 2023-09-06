import { PrismaClient } from "@prisma/client";
import { importacaoEventos } from "./importWorkers/importacaoEventos";

export async function insertEventos(prisma: PrismaClient) {
  await importacaoEventos(prisma);
}
