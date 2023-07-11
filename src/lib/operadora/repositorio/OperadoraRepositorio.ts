import { prisma } from "@/lib/db/prisma";
import { Operadora } from "@prisma/client";

export const OperadoraRepositorio = {
  listar: async () => {
    const operadoras = await prisma.operadora.findMany({
      include: {
        arquivos: true,
      },
    });
    return operadoras;
  },

  buscarPorId: async (id: number) => {
    const operadora = await prisma.operadora.findUnique({
      where: {
        id,
      },
      include: {
        arquivos: true,
      },
    });

    return operadora;
  },

  criarAtualizar: async (operadora: Operadora) => {
    return await prisma.operadora.upsert({
      where: { id: operadora.id },
      create: {
        nome: operadora.nome,
      },
      update: {
        ...operadora,
      },
    });
  },
};

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;
export type OperadorasWithArquivos = ThenArg<
  ReturnType<typeof OperadoraRepositorio.listar>
>;

export type OperadoraWithArquivos = ThenArg<
  ReturnType<typeof OperadoraRepositorio.buscarPorId>
>;
