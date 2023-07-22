import { prisma } from "@/lib/db/prisma";
import { insertUsuarios } from "./usuario";
import { insertCargos } from "./cargo";

async function main() {
  await insertUsuarios();

  await insertCargos();
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
