import { prisma } from "@/lib/db/prisma";

export async function insertEmpresa() {
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
        CNPJ: "123456",
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
}
