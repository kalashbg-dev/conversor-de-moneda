import { create } from 'zustand';
import type { ConversionStore } from '../types';

const initialState = {
  amount: '',
  currencyFrom: '',
  currencyTo: '',
  selectedInstitution: '',
  result: null,
  baseRate: null,
};

export const useConversionStore = create<ConversionStore>((set, get) => ({
  ...initialState,
  setAmount: (amount: string) => set({ amount }),
  setCurrencyFrom: (currencyFrom: string) => set({ currencyFrom }),
  setCurrencyTo: (currencyTo: string) => set({ currencyTo }),
  setSelectedInstitution: (selectedInstitution: string) => set({ selectedInstitution }),
  setResult: (result: number | null) => set({ result }),
  setBaseRate: (baseRate: number | null) => set({ baseRate }),
  reset: () => {
    const { currencyFrom, currencyTo } = get();
    set({
      ...initialState,
      currencyFrom,  // Mantener el ISO de origen
      currencyTo,    // Mantener el ISO de destino
    });
  },
}));