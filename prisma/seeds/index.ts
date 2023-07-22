import { prisma } from "@/lib/db/prisma";
import { insertUsuarios } from "./usuario";
import { insertCargos } from "./cargo";
import { insertPessoas } from "./pessoa";
import { insertOperadora } from "./operadora";
import { insertEmpresa } from "./empresa";
import { insertPlano } from "./plano";

async function main() {
  await insertUsuarios();

  await insertOperadora();
  await insertCargos();
  await insertEmpresa();
  await insertPlano();
  await insertPessoas();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
