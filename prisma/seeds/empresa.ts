import { PrismaClient } from "@prisma/client";
import { hrtime } from "process";

export async function insertEmpresa(prisma: PrismaClient) {
  const start = hrtime.bigint();

  const inicioContrato = new Date();

  await prisma.empresa.createMany({
    data: [
      {
        id: 1,
        nome: "Empresa 1",
        CNPJ: "123456",
        inicioContrato,
        fimContrato: new Date(
          inicioContrato.getFullYear() + 1,
          inicioContrato.getMonth(),
          inicioContrato.getDate()
        ),
        limitadorTecnico: 70,
      },
      {
        id: 2,
        nome: "Empresa 2",
        CNPJ: "2345678",
        inicioContrato,
        fimContrato: new Date(
          inicioContrato.getFullYear() + 1,
          inicioContrato.getMonth(),
          inicioContrato.getDate()
        ),
        limitadorTecnico: 80,
      },
    ],
  });

  const end = hrtime.bigint();
  console.info(`Empresas importadas em: ${(end - start) / BigInt(10 ** 6)}ms`);
}
