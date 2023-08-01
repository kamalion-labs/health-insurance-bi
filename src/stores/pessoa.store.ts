import { create } from "zustand";

interface PessoaState {
  id: number | undefined;

  setId: (id: number | undefined) => void;
}

export const usePessoa = create<PessoaState>((set) => ({
  id: undefined,
  setId: (id: number | undefined) => set(() => ({ id })),
}));
