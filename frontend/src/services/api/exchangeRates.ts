import { api } from '@/lib/axios';
import type { ExchangeRate } from '@/types/api';

export const exchangeRateApi = {
  getAll: () => 
    api.get<ExchangeRate[]>('/exchange-rates'),
  
  getById: (id: string) =>
    api.get<ExchangeRate>(`/exchange-rates/${id}`),
  
  create: (data: { currencyFrom: string; currencyTo: string; exchangeRate: number }) =>
    api.post<ExchangeRate>('/exchange-rates', data),
  
  update: (id: string, data: { currencyFrom: string; currencyTo: string; exchangeRate: number }) =>
    api.put<ExchangeRate>(`/exchange-rates/${id}`, data),
  
  delete: (id: string) =>
    api.delete(`/exchange-rates/${id}`)
};