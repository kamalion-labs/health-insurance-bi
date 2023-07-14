import { prisma } from "@/lib/db/prisma";
import { ThenArg } from "@/lib/util/ThenArg";
import { ArquivoOperadora } from "@prisma/client";

export const ArquivosRepositorio = {
  listar: async (idOperadora: number) => {
    const arquivos = await prisma.arquivoOperadora.findMany({
      where: {
        idOperadora,
      },
    });
    return arquivos;
  },

  buscarPorId: async (id: number) => {
    const arquivo = await prisma.arquivoOperadora.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        colunas: true,
      },
    });

    return arquivo;
  },

  criar: async (arquivo: ArquivoOperadora) => {
    return await prisma.arquivoOperadora.create({
      data: {
        nome: arquivo.nome,
        tipo: arquivo.tipo,
        separador: arquivo.separador,
        tabela: arquivo.tabela,
        idOperadora: +arquivo.idOperadora,
      },
    });
  },

  atualizar: async (arquivo: ArquivoOperadora) => {
    return await prisma.arquivoOperadora.update({
      where: {
        id: arquivo.id,
      },
      data: {
        nome: arquivo.nome,
        tipo: arquivo.tipo,
        separador: arquivo.separador,
        tabela: arquivo.tabela,
        idOperadora: +arquivo.idOperadora,
      },
    });
  },

  deletar: async (id: number) => {
    return await prisma.arquivoOperadora.delete({
      where: {
        id,
      },
    });
  },
};

export type ArquivoWithColunas = ThenArg<
  ReturnType<typeof ArquivosRepositorio.buscarPorId>
>;
