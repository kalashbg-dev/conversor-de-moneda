import { api } from '@/lib/axios';

export interface ExchangeRateHistory {
  _id: string;
  currencyFrom: string;
  currencyTo: string;
  exchangeRate: number;
  institution?: {
    _id: string;
    name: string;
  };
  date: string;
  createdAt: string;
  updatedAt: string;
}

export const exchangeRateHistoryApi = {
  getAll: () => 
    api.get<ExchangeRateHistory[]>('/exchange-rate-history')
};