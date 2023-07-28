import { prisma } from "@/lib/db/prisma";
import { ThenArg } from "@/lib/util/ThenArg";

export const EventoRepositorio = {
  listar: async (idEmpresa: string) => {
    const eventos = await prisma.evento.findMany({
      include: {
        procedimento: true,
        pessoa: {
          include: {
            tipoTitularidade: true,
          },
        },
      },
      where: {
        pessoa: {
          idEmpresa: +idEmpresa,
        },
      },
      orderBy: {
        dataPagamento: "asc",
      },
    });

    return eventos;
  },

  buscarPorId: async (id: number) => {
    const evento = await prisma.evento.findUnique({
      where: {
        id,
      },
      include: {
        pessoa: {
          include: {
            tipoTitularidade: true,
          },
        },
      },
    });

    return evento;
  },
};

export type EventosWithPessoa = ThenArg<
  ReturnType<typeof EventoRepositorio.listar>
>;

export type EventoWithPessoa = ThenArg<
  ReturnType<typeof EventoRepositorio.buscarPorId>
>;
