import { PrismaClient } from "@prisma/client";
import { hrtime } from "process";
import { Worker } from "worker_threads";

export async function importacaoEventos(prisma: PrismaClient) {
  return new Promise(async (resolve, reject) => {
    const start = hrtime.bigint();

    const amount = 100;

    const cids = await prisma.cid.findMany();
    const prestadores = await prisma.prestador.findMany();
    const pessoas = await prisma.pessoa.findMany();
    const procedimentos = await prisma.procedimento.findMany();

    const tiposInternacao = [
      "CLINICA",
      "CIRURGICA",
      "OBSTETRICA",
      "PSIQUIATRICA",
      "PEDIATRICA",
    ];
    const riscos = ["BAIXO", "MEDIO", "ALTO"];
    const situacoes = ["PENDENTE", "LIBERADA", "NEGADA", "CANCELADA"];
    const tipoParto = ["CESAREO", "VAGINAL"];
    const situacaoSenha = ["LIBERADA", "NEGADA"];

    const poolSize = 10;
    const pool = new Set();

    const chunkSize = amount / poolSize;

    for (let i = 0; i < poolSize; i++) {
      const worker = new Worker("./importWorkers/workerEventos.ts", {
        name: i.toString(),
      });

      worker.postMessage({
        amount: chunkSize,
        cids,
        prestadores,
        pessoas,
        procedimentos,
        tiposInternacao,
        riscos,
        situacoes,
        tipoParto,
        situacaoSenha,
        threadId: i,
      });

      // worker.on('message', (result) => {
      //   console.log(result);
      // });

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
            `Eventos importados em: ${(end - start) / BigInt(10 ** 6)}ms`
          );
        }
      });

      pool.add(worker);
    }
  });
}
