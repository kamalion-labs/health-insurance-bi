import { PrismaClient } from "@prisma/client";

export async function insertEspecialidades(prisma: PrismaClient) {
  await prisma.especialidade.createMany({
    data: [
      {
        id: 1,
        nome: "Clínica Médica",
      },
      {
        id: 2,
        nome: "Patologia Clínica/Medicina Laboratorial",
      },
      {
        id: 3,
        nome: "Oncologia",
      },
      {
        id: 4,
        nome: "Cardiologia",
      },
      {
        id: 5,
        nome: "Anestesiologia",
      },
      {
        id: 6,
        nome: "Radiologia E Diagnóstico Por Imagem",
      },
      {
        id: 7,
        nome: "Patologia",
      },
      {
        id: 8,
        nome: "Ginecologia E Obstetrícia",
      },
    ],
  });
}
