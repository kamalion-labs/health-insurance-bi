import { prisma } from "@/lib/db/prisma";

export async function insertPrestadores() {
  await prisma.prestador.createMany({
    data: [
      {
        id: 1,
        nome: "Hospital HSP",
        UF: "DF",
        hospital: true,
      },
      {
        id: 2,
        nome: "Clínica CLN",
        UF: "SP",
        hospital: false,
      },
      {
        id: 3,
        nome: "Laboratório LBR",
        UF: "DF",
        hospital: false,
      },
      {
        id: 4,
        nome: "Hospital HRM",
        UF: "MG",
        hospital: true,
      },
    ],
  });
}
