import { prisma } from "@/lib/db/prisma";
import { ThenArg } from "@/lib/util/ThenArg";
import { Operadora } from "@prisma/client";

export const OperadoraRepositorio = {
  listar: async () => {
    const operadoras = await prisma.operadora.findMany({
      include: {
        arquivos: {
          include: {
            colunas: true,
          },
        },
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
        arquivos: {
          include: {
            colunas: true,
          },
        },
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

  deletar: async (id: number) => {
    return await prisma.operadora.delete({
      where: {
        id,
      },
    });
  },
};

export type OperadorasWithArquivos = ThenArg<
  ReturnType<typeof OperadoraRepositorio.listar>
>;

export type OperadoraWithArquivos = ThenArg<
  ReturnType<typeof OperadoraRepositorio.buscarPorId>
>;
