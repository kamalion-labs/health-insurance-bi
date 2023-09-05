import { PrismaClient } from "@prisma/client";
import { hrtime } from "process";

export async function insertEspecialidades(prisma: PrismaClient) {
  const start = hrtime.bigint();
  
  await prisma.especialidade.createMany({
    data: [
      {
        id: 1,
        codigo: "clinica-medica",
        nome: "Clínica Médica",
      },
      {
        id: 2,
        codigo: "patologia-clinica",
        nome: "Patologia Clínica/Medicina Laboratorial",
      },
      {
        id: 3,
        codigo: "oncologia",
        nome: "Oncologia",
      },
      {
        id: 4,
        codigo: "cardiologia",
        nome: "Cardiologia",
      },
      {
        id: 5,
        codigo: "anestesiologia",
        nome: "Anestesiologia",
      },
      {
        id: 6,
        codigo: "radiologia",
        nome: "Radiologia E Diagnóstico Por Imagem",
      },
      {
        id: 7,
        codigo: "patologia",
        nome: "Patologia",
      },
      {
        id: 8,
        codigo: "ginecologia",
        nome: "Ginecologia E Obstetrícia",
      },
      {
        id: 9,
        codigo: "ortopedia",
        nome: "Ortopedia",
      },
    ],
  });

  const end = hrtime.bigint();
  console.info(`Especialidades importadas em: ${(end - start) / BigInt(10 ** 6)}ms`);
}
