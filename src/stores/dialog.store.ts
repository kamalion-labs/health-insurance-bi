import { create } from "zustand";

interface DialogState {
  modalList: { id: string; isOpen: boolean }[];
  getIsOpen: (id?: string) => boolean | undefined;
  setIsOpen: (id?: string, isOpen?: boolean) => void;
  register: (id: string) => void;
}

export const useDialog = create<DialogState>((set, get) => ({
  modalList: [],

  getIsOpen: (id) => get().modalList.find((x) => x.id === id)?.isOpen,

  setIsOpen: (id, isOpen) =>
    set(({ modalList }) => {
      const item = modalList.find((x) => x.id === id);

      if (item && id && isOpen) {
        modalList = modalList.splice(modalList.indexOf(item), 1, {
          id,
          isOpen,
        });
      }

      return { modalList };
    }),

  register: (id) =>
    set(({ modalList }) => ({
      modalList: [...modalList, { id, isOpen: false }],
    })),
}));
