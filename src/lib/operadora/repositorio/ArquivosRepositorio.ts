import { prisma } from "@/lib/db/prisma";

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
};
