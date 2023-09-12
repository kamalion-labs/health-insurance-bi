import { create } from "zustand";

interface FiltroState {
  idCategoria: number | undefined;
  setIdCategoria: (idCategoria: number | undefined) => void;

  dataInicio: Date | undefined;
  setDataInicio: (dataInicio: Date | undefined) => void;

  dataFim: Date | undefined;
  setDataFim: (dataFim: Date | undefined) => void;
}

export const useFiltro = create<FiltroState>((set) => ({
  idCategoria: undefined,
  setIdCategoria: (idCategoria: number | undefined) =>
    set(() => ({ idCategoria })),

  dataInicio: undefined,
  setDataInicio: (dataInicio: Date | undefined) => set(() => ({ dataInicio })),

  dataFim: undefined,
  setDataFim: (dataFim: Date | undefined) => set(() => ({ dataFim })),
}));
