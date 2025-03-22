import { create } from 'zustand';

type AmountState = {
  state: number;
  currency: string;
  setAmount: (newAmount: number) => void;
  setAmountCurrency: (currency: string) => void;
  resetAmount: () => void;
};

export const useAmountState = create<AmountState>((set) => ({
  state: 0,
  currency: '$',
  setAmount: (newAmount) => set((prev) => ({ state: prev.state + newAmount })),
  setAmountCurrency: (currency) => set(() => ({ currency })),
  resetAmount: () => set({ state: 0 }),
}));
