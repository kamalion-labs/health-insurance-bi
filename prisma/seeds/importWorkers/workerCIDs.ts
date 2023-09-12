import { PrismaClient } from "@prisma/client";
import { parentPort } from "worker_threads";

require("ts-node").register();

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

const prisma = new PrismaClient();

parentPort?.on("message", async (lines) => {
  for (let i = 0; i < lines.length; i++) {
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

    parentPort?.postMessage(cols[0]);
  }

  parentPort?.close();
});
