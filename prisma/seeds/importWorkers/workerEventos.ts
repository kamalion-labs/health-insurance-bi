require('ts-node').register();

import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { parentPort } from "worker_threads";
import { addDays } from "date-fns";

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

const prisma = new PrismaClient();

parentPort?.on("message", async (params) => {
  const { 
    amount, 
    cids, 
    prestadores,
    pessoas,
    procedimentos,
    tiposInternacao,
    riscos,
    situacoes,
    tipoParto,
    situacaoSenha 
  } = params;

  for (let i = 0; i < amount; i++) {
    const dtRealizacao = faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2023-12-31T00:00:00.000Z' });
    const dtPagamento = addDays(dtRealizacao, faker.number.int({ min: 10, max: 60 }));

    const cid = cids[faker.number.int({ min: 0, max: cids.length - 1 })];
    const prestador = prestadores[faker.number.int({ min: 0, max: prestadores.length - 1 })];
    const pessoa = pessoas[faker.number.int({ min: 0, max: pessoas.length - 1 })];
    const procedimento = procedimentos[faker.number.int({ min: 0, max: procedimentos.length - 1 })];

    const teveInternacao = faker.datatype.boolean({ probability: 0.20 });

    const gravida = procedimento.idEspecialidade === 8 && faker.datatype.boolean({ probability: 0.40 });
    const teveParto = gravida && faker.datatype.boolean({ probability: 0.10 });

    await prisma.evento.create({
      data: {
        dataRealizacao: dtRealizacao,
        dataPagamento: dtPagamento,
        quantidade: 1,
        custoTotal: faker.number.float({ min: 75.5, max: 15000.69 }),
        sinistro: faker.number.float({ min: 75.5, max: 10000 }),
        coparticipacao: faker.number.float({ min: 75.5, max: 100 }),
        descricao: `DESCRIÇÃO TESTE ${i + 1}`,

        codigoCID: cid.codigo,
        idPrestador: prestador.id,
        idPessoa: pessoa.id,
        idProcedimento: procedimento.id,

        teveInternacao,
        tipoInternacao: teveInternacao ? faker.helpers.arrayElement(tiposInternacao) as any : null,

        risco: faker.helpers.arrayElement(riscos) as any,

        reembolso: faker.datatype.boolean({ probability: 0.85 }),
        prontoSocorro: faker.datatype.boolean({ probability: 0.70 }),
        UTI: faker.datatype.boolean({ probability: 0.70 }),

        situacao: faker.helpers.arrayElement(situacoes) as any,
        tipoParto: teveParto ? faker.helpers.arrayElement(tipoParto) as any : null
      }
    });

    //parentPort?.postMessage(cols[0]);
  }

  parentPort?.close();
});
