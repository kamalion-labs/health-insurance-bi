import { create } from "zustand";

interface FiltroState {
  idCategoria: number | undefined;
  setIdCategoria: (idCategoria: number | undefined) => void;
}

export const useFiltro = create<FiltroState>((set) => ({
  idCategoria: undefined,
  setIdCategoria: (idCategoria: number | undefined) =>
    set(() => ({ idCategoria })),
}));
