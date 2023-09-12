import { PrismaClient } from "@prisma/client";
import { hrtime } from "process";
import { Worker } from "worker_threads";

export async function importacaoLiberacoes(prisma: PrismaClient) {
  return new Promise(async (resolve, reject) => {
    const start = hrtime.bigint();

    const amount = 100;

    const planos = await prisma.plano.findMany();
    const prestadores = await prisma.prestador.findMany();
    const situacoesSenha = ["LIBERADA", "NEGADA"];

    const regimeInternacao = ["HOSPITALAR", "HOSPITAL_DIA"];

    const poolSize = 10;
    const pool = new Set();

    const chunkSize = amount / poolSize;

    for (let i = 0; i < poolSize; i++) {
      const worker = new Worker("./importWorkers/workerLiberacoes.ts", {
        name: i.toString(),
      });

      worker.postMessage({
        amount: chunkSize,
        planos,
        prestadores,
        situacoesSenha,
        regimeInternacao,
      });

      worker.on("error", (error) => {
        console.error(error);
        reject(error);
      });

      worker.on("exit", (result) => {
        /* Execution time end */
        pool.delete(worker);

        if (pool.size === 0) {
          resolve(null);
          const end = hrtime.bigint();
          console.info(
            `Liberações importadas em: ${(end - start) / BigInt(10 ** 6)}ms`
          );
        }
      });

      pool.add(worker);
    }
  });
}
