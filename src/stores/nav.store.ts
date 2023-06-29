import { create } from "zustand";

interface PageState {
  title: string;
  id: string;
  parentId?: string;

  setTitle: (title: string) => void;
  setId: (id: string) => void;
  setParentId: (parentId: string) => void;
}

export const usePage = create<PageState>((set) => ({
  title: "",
  id: "",
  parentId: "",

  setTitle: () => set((state) => ({ title: state.title })),
  setId: () => set((state) => ({ id: state.id })),
  setParentId: () => set((state) => ({ parentId: state.parentId })),
}));
