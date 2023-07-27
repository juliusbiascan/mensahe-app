import { create } from 'zustand';

interface usePageModalPage {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const usePageModal = create<usePageModalPage>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
