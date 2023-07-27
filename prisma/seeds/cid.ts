import { importacaoCID } from "../../src/lib/cid/dominio/importacaoCIDs";
import { PrismaClient } from "@prisma/client";
import path from "path";

export async function insertCids(prisma: PrismaClient) {
  await importacaoCID(path.join(__dirname, "./datasources/cids.csv"), prisma);
}
