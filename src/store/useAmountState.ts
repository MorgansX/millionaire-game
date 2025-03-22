import { create } from 'zustand';

type AmountState = {
  state: number;
  setAmount: (newAmount: number) => void;
  resetAmount: () => void;
};

export const useAmountState = create<AmountState>((set) => ({
  state: 0,
  setAmount: (newAmount) => set(() => ({ state: newAmount })),
  resetAmount: () => set({ state: 0 }),
}));
