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
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await insertUsuarios();

  await insertOperadora();
  await insertCargos();
  await insertEmpresa();
  await insertPlano();
  await insertPessoas();

  await insertEspecialidades();
  await insertCategorias();
  await insertProcedimentos();
  await insertCids();
  await insertPrestadores();
  await insertEventos();
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
