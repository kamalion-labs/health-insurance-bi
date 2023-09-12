import { PrismaClient } from "@prisma/client";
import { insertUsuarios } from "./usuario";
import { insertCargos } from "./cargo";
import { insertPessoas } from "./pessoa";
import { insertOperadora } from "./operadora";
import { insertEmpresa } from "./empresa";
import { insertPlano } from "./plano";
import { insertEspecialidades } from "./especialidade";
import { insertCategorias } from "./categoria";
import { insertProcedimentos } from "./procedimento";
import { insertCids } from "./cid";
import { insertPrestadores } from "./prestador";
import { insertEventos } from "./evento";
import { insertLiberacoes } from "./liberacao";

const prisma = new PrismaClient();

async function main() {
  await insertUsuarios(prisma);

  await insertOperadora(prisma);
  await insertCargos(prisma);
  await insertEmpresa(prisma);
  await insertPlano(prisma);
  await insertPessoas(prisma);

  await insertEspecialidades(prisma);
  await insertCategorias(prisma);
  await insertProcedimentos(prisma);
  await insertCids();
  await insertPrestadores(prisma);
  await insertLiberacoes(prisma);
  await insertEventos(prisma);
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
