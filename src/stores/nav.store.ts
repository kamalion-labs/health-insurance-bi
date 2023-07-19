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

  setTitle: (title) => set(() => ({ title })),
  setId: (id) => set(() => ({ id })),
  setParentId: (parentId) => set(() => ({ parentId })),
}));
