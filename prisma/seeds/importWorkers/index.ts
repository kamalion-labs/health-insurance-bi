import { hrtime } from "process";
import { Worker } from "worker_threads";

async function doIt() {
  /* Execution time start */
  const start = hrtime.bigint()

  const items = Array.from({ length: 20 }, (value, index) => index);

  let poolSize = 3;
  let pool = new Set();

  let chunkSize = items.length / poolSize;

  for(let i = 0; i < poolSize; i++) {
    let worker = new Worker(__dirname + '/worker1.ts', { name: i.toString() });
    let startPosition = i * chunkSize;
    let endPosition = i * chunkSize + chunkSize;

    worker.postMessage(items.slice(startPosition, endPosition));

    worker.on('message', (result) => {
      //console.log(result);
    });

    worker.on("error", error => {
      console.error(error);
    })

    worker.on('exit', result => {
      /* Execution time end */
      pool.delete(worker);
  
      if(pool.size === 0) {
        const end = hrtime.bigint();
        console.info(`Execution time: ${(end - start) / BigInt(10 ** 6)}ms`);
      }
    })

    pool.add(worker);
  }

  // Create a new worker
  // let worker1 = new Worker('./worker1.js');
  // let worker2 = new Worker('./worker1.js');

  // Send the contents to the worker
  // worker1.postMessage(items.splice(0, items.length / 2));
  // worker2.postMessage(items);

  // Get result from the worker
  // worker1.on('message', (result) => {
  //   console.log(result);
  // });

  // Get result from the worker
  // worker2.on('message', (result) => {
  //   console.log(result);
  // });

  // worker1.on('exit', result => {
  //   /* Execution time end */
  //   worker1 = undefined;

  //   if(!worker2) {
  //     const end = hrtime.bigint();
  //     console.info(`Execution time: ${(end - start) / BigInt(10 ** 6)}ms`);
  //   }
  // })

  // worker2.on('exit', result => {
  //   /* Execution time end */
  //   worker2 = undefined;

  //   if(!worker1) {
  //     const end = hrtime.bigint()
  //     console.info(`Execution time: ${(end - start) / BigInt(10 ** 6)}ms`)
  //   }
  // })
}

doIt();