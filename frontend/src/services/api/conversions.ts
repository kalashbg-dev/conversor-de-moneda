import { api } from '@/lib/axios';
import type { Conversion } from '@/types/api';

interface ConversionRequest {
  currencyFrom: string;
  currencyTo: string;
  amount: number;
  institution?: string;
}

interface ConversionResponse {
  result: number;
  amount: number;
  currencyFrom: string;
  currencyTo: string;
  date: string;
}

export const conversionApi = {
  convert: (data: ConversionRequest) =>
    api.post<ConversionResponse>('/conversions/convert', data),
  
  getHistory: () =>
    api.get<Conversion[]>('/conversions/history'),
};