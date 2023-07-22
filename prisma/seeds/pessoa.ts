import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

export async function insertPessoas(prisma: PrismaClient) {
  await prisma.tipoTitularidade.createMany({
    data: [
      {
        id: 1,
        nome: "TITULAR",
      },
      {
        id: 2,
        nome: "DEPENDENTE",
        grauParentesco: "FILHO",
      },
      {
        id: 3,
        nome: "DEPENDENTE",
        grauParentesco: "CONJUGE",
      },
    ],
  });

  await prisma.pessoa.createMany({
    data: [
      {
        id: 1,
        nome: faker.person.fullName(),
        CPF: faker.number
          .int({ min: 10000000000, max: 99999999999 })
          .toString()
          .padStart(11, "0"),
        sexo: "M",
        idCargo: 1,
        idEmpresa: 1,
        idPlano: 1,
        idTipoTitularidade: 1,
      },
      {
        id: 2,
        nome: faker.person.fullName(),
        CPF: faker.number
          .int({ min: 10000000000, max: 99999999999 })
          .toString()
          .padStart(11, "0"),
        sexo: "F",
        idEmpresa: 1,
        idPlano: 1,
        idTipoTitularidade: 2,
        idTitular: 1,
      },
      {
        id: 3,
        nome: faker.person.fullName(),
        CPF: faker.number
          .int({ min: 10000000000, max: 99999999999 })
          .toString()
          .padStart(11, "0"),
        sexo: "M",
        idEmpresa: 1,
        idPlano: 1,
        idTipoTitularidade: 3,
        idTitular: 1,
      },
      {
        id: 4,
        nome: faker.person.fullName(),
        CPF: faker.number
          .int({ min: 10000000000, max: 99999999999 })
          .toString()
          .padStart(11, "0"),
        sexo: "F",
        idCargo: 1,
        idEmpresa: 1,
        idPlano: 1,
        idTipoTitularidade: 1,
      },
      {
        id: 5,
        nome: faker.person.fullName(),
        CPF: faker.number
          .int({ min: 10000000000, max: 99999999999 })
          .toString()
          .padStart(11, "0"),
        sexo: "M",
        idCargo: 1,
        idEmpresa: 1,
        idPlano: 2,
        idTipoTitularidade: 1,
      },
      {
        id: 6,
        nome: faker.person.fullName(),
        CPF: faker.number
          .int({ min: 10000000000, max: 99999999999 })
          .toString()
          .padStart(11, "0"),
        sexo: "M",
        idCargo: 1,
        idEmpresa: 2,
        idPlano: 3,
        idTipoTitularidade: 1,
      },
    ],
  });
}
