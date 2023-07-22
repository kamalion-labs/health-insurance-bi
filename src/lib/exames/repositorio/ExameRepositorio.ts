import { prisma } from "@/lib/db/prisma";
import { ThenArg } from "@/lib/util/ThenArg";

export const ProcedimentoRepositorio = {
  listar: async () => {
    const procedimentos = await prisma.procedimento.findMany({
      include: {
        categoria: true,
        eventos: {
          include: {
            pessoa: true,
          },
        },
      },
    });
    return procedimentos;
  },

  buscarPorId: async (id: number) => {
    const procedimento = await prisma.procedimento.findUnique({
      where: {
        id,
      },
    });

    return procedimento;
  },
};

export type ProcedimentosWithCategoriaEventosPessoa = ThenArg<
  ReturnType<typeof ProcedimentoRepositorio.listar>
>;

export type ProcedimentoWithCategoriaEventosPessoa = ThenArg<
  ReturnType<typeof ProcedimentoRepositorio.buscarPorId>
>;
