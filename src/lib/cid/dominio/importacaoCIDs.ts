import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";

export async function importacaoCID(csvPath: string, prisma: PrismaClient) {
  const content = await fs.readFile(csvPath, { encoding: "utf-8" });
  const lines = content.split("\n");

  // Começa no 1 pq pula o cabeçalho
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];

    if (line === "") {
      continue;
    }

    const cols = line.split(";");

    await prisma.cid.create({
      data: {
        codigo: cols[0],
        descricao: cols[2],
        descricaoAbreviada: cols[3].replace(cols[0], "").trim(),
      },
    });
  }
}
