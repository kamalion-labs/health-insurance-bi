import { readFile } from "fs/promises";
import { hrtime } from "process";
import { Worker } from "worker_threads";

export async function importacaoCID(csvPath: string) {
  return new Promise(async (resolve, reject) => {
    const start = hrtime.bigint();

    const content = await readFile(csvPath, { encoding: "utf-8" });
    const lines = content.split("\n");
    lines.splice(0, 1);

    let poolSize = 10;
    let pool = new Set();

    let chunkSize = lines.length / poolSize;

    for(let i = 0; i < poolSize; i++) {
      let worker = new Worker('./importWorkers/workerCIDs.ts', { name: i.toString() });
      let startPosition = i * chunkSize;
      let endPosition = i * chunkSize + chunkSize;

      worker.postMessage(lines.slice(startPosition, endPosition));

      worker.on('message', (result) => {
        //console.log(result);
      });

      worker.on("error", error => {
        console.error(error);
        reject(error);
      })

      worker.on('exit', result => {
        /* Execution time end */
        pool.delete(worker);
    
        if(pool.size === 0) {
          resolve(null);
          const end = hrtime.bigint();
          console.info(`CIDs importados em: ${(end - start) / BigInt(10 ** 6)}ms`);
        }
      })

      pool.add(worker);
    }
  });
}
