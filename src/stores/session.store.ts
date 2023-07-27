import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SessionState {
  idEmpresa: number;
  setIdEmpresa: (idEmpresa: number) => void;
}

export const useSession = create<SessionState>()(
  persist(
    (set) => ({
      idEmpresa: 0,
      setIdEmpresa: (idEmpresa) => set(() => ({ idEmpresa })),
    }),
    {
      name: "session",
    }
  )
);
