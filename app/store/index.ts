import { create } from 'zustand';

type StoreType = {
  stockTitle: string;
  setStockTitle: (newTitle: string) => void;
};

const useStore = create<StoreType>((set) => ({
  stockTitle: '',
  setStockTitle: (newTitle: string) => set({ stockTitle: newTitle }),
}));

export { useStore };
