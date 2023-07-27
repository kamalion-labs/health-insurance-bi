import { create } from "zustand";

interface PageState {
  title: string;
  setTitle: (title: string) => void;

  id: string;
  setId: (id: string) => void;

  parentId?: string;
  setParentId: (parentId: string) => void;
}

export const usePage = create<PageState>((set) => ({
  title: "",
  setTitle: (title) => set(() => ({ title })),

  id: "",
  setId: (id) => set(() => ({ id })),

  parentId: "",
  setParentId: (parentId) => set(() => ({ parentId })),
}));
