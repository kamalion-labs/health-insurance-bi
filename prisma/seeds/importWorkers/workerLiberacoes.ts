import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import { addDays } from "date-fns";
import { parentPort } from "worker_threads";

const prisma = new PrismaClient();

parentPort?.on("message", async (params) => {
  const { amount, planos, prestadores, situacoesSenha, regimeInternacao } =
    params;

  for (let i = 0; i < amount; i++) {
    const dataSolicitacao = faker.date.between({
      from: "2020-01-01T00:00:00.000Z",
      to: "2023-12-31T00:00:00.000Z",
    });

    const dataInternacao = addDays(
      dataSolicitacao,
      faker.number.int({ min: 10, max: 60 })
    );

    const certificado = faker.number.int({ min: 10000, max: 100000 });
    const dependencia = faker.number.int({ min: 100, max: 999 });
    const contrato = faker.number.int({ min: 1000, max: 9999 });
    const subfatura = faker.number.int({ min: 100, max: 999 });
    const senha = faker.internet.password({ length: 6, pattern: /[A-Z]/ });
    const diasSolicitacaoSenha = faker.number.int({ min: 0, max: 15 });
    const diasLiberacaoSenha = faker.number.int({ min: 0, max: 10 });

    const idPrestador = faker.number.int({
      min: 1,
      max: prestadores.length,
    });

    const idPlano = faker.number.int({ min: 1, max: planos.length });

    const teveInternacao = faker.datatype.boolean({ probability: 0.1 });

    await prisma.liberacao.create({
      data: {
        certificado,
        dependencia,
        contrato,
        subfatura,
        senha,
        diasSolicitacaoSenha,
        diasLiberacaoSenha,
        situacaoSenha: faker.helpers.arrayElement(situacoesSenha) as any,
        possuiLiminar: faker.datatype.boolean({ probability: 0.3 }),
        regimeInternacao: faker.helpers.arrayElement(regimeInternacao) as any,
        dataSolicitacao: faker.date.between({
          from: "2020-01-01T00:00:00.000Z",
          to: "2023-12-31T00:00:00.000Z",
        }),
        idPrestador,
        idPlano,
        dataInternacao: teveInternacao ? dataInternacao : null,
      },
    });
  }

  parentPort?.close();
});
