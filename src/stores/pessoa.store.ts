import { create } from "zustand";

interface PessoaState {
  id: number;

  setId: (id: number) => void;
}

export const usePessoa = create<PessoaState>((set) => ({
  id: 0,
  setId: (id: number) => set(() => ({ id })),
}));
