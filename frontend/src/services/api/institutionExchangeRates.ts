import { api } from '@/lib/axios';

export interface InstitutionExchangeRate {
  _id: string;
  currencyFrom: string;
  currencyTo: string;
  exchangeRate: number;
  institution: {
    _id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface CreateExchangeRateData {
  currencyFrom: string;
  currencyTo: string;
  exchangeRate: number;
  institution: string;
}

export const institutionExchangeRateApi = {
  getAll: () => 
    api.get<InstitutionExchangeRate[]>('/institutions-exchange-rates'),
  
  getById: (id: string) =>
    api.get<InstitutionExchangeRate>(`/institutions-exchange-rates/${id}`),
  
  create: (data: CreateExchangeRateData) =>
    api.post<InstitutionExchangeRate>('/institutions-exchange-rates', data),
  
  update: (id: string, data: CreateExchangeRateData) =>
    api.put<InstitutionExchangeRate>(`/institutions-exchange-rates/${id}`, data),
  
  delete: (id: string) =>
    api.delete(`/institutions-exchange-rates/${id}`),
};