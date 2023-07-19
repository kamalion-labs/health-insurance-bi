import { prisma } from "@/lib/db/prisma";
import { ThenArg } from "@/lib/util/ThenArg";

export const ExameRepositorio = {
  listar: async () => {
    const exames = await prisma.exame.findMany({
      include: {
        categoria: true,
        eventos: {
          include: {
            pessoa: true,
          },
        },
      },
    });
    return exames;
  },

  buscarPorId: async (id: number) => {
    const exame = await prisma.exame.findUnique({
      where: {
        id,
      },
    });

    return exame;
  },
};

export type ExamesWithCategoriaEventosPessoa = ThenArg<
  ReturnType<typeof ExameRepositorio.listar>
>;

export type ExameWithCategoriaEventosPessoa = ThenArg<
  ReturnType<typeof ExameRepositorio.buscarPorId>
>;
