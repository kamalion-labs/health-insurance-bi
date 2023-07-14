import { prisma } from "@/lib/db/prisma";
import { ColunaArquivo } from "@prisma/client";

export const ColunaArquivoRepositorio = {
  listar: async (idArquivo: number) => {
    const colunas = await prisma.colunaArquivo.findMany({
      where: {
        idArquivoOperadora: idArquivo,
      },
    });
    return colunas;
  },

  buscarPorId: async (id: number) => {
    const coluna = await prisma.colunaArquivo.findUnique({
      where: {
        id,
      },
    });

    return coluna;
  },

  criar: async (coluna: ColunaArquivo) => {
    return await prisma.colunaArquivo.create({
      data: {
        nome: coluna.nome,
        coluna: coluna.coluna,
        tipo: coluna.tipo,
        posicao: Number(coluna.posicao) ?? undefined,
        inicio: Number(coluna.inicio) ?? undefined,
        fim: Number(coluna.fim) ?? undefined,
        referenciaTabela: coluna.referenciaTabela,
        referenciaColuna: coluna.referenciaColuna,
        idArquivoOperadora: +coluna.idArquivoOperadora,
      },
    });
  },

  atualizar: async (coluna: ColunaArquivo) => {
    return await prisma.colunaArquivo.update({
      where: {
        id: coluna.id,
      },
      data: {
        id: coluna.id,
        nome: coluna.nome,
        coluna: coluna.coluna,
        tipo: coluna.tipo,
        posicao: Number(coluna.posicao) ?? undefined,
        inicio: Number(coluna.inicio) ?? undefined,
        fim: Number(coluna.fim) ?? undefined,
        referenciaTabela: coluna.referenciaTabela,
        referenciaColuna: coluna.referenciaColuna,
        idArquivoOperadora: +coluna.idArquivoOperadora,
      },
    });
  },

  deletar: async (id: number) => {
    return await prisma.colunaArquivo.delete({
      where: {
        id,
      },
    });
  },
};
