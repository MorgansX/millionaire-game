import { create } from 'zustand';
import { HexagonState } from '@/types';

export type HexagonStateProps = {
  buttonId: string;
  state: HexagonState;
};

type HexagonStore = {
  state: HexagonStateProps;
  setHexagonStateTo: (newState: HexagonStateProps) => void;
  resetState: () => void;
};

const DEFAULT_STATE = { buttonId: '', state: 'inactive' } as HexagonStateProps;

export const useHexagonState = create<HexagonStore>((set) => ({
  state: DEFAULT_STATE,
  setHexagonStateTo: (newState: HexagonStateProps) => set({ state: newState }),
  resetState: () => set({ state: DEFAULT_STATE }),
}));
