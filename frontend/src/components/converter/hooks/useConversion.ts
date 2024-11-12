import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { toast } from 'sonner';
import type { ConversionResult } from '../types';

interface ConversionData {
  amount: number;
  currencyFrom: string;
  currencyTo: string;
  institution_exchange_rate_id?: string;
}

export const useConversion = (onSuccess: (data: ConversionResult) => void) => {
  return useMutation({
    mutationFn: async (data: ConversionData) => {
      const response = await api.post<ConversionResult>('/conversions/convert', data);
      return response.data;
    },
    onSuccess: (data) => {
      onSuccess(data);
    },
    onError: (error: unknown) => {
      toast.error((error as { response?: { data?: { error?: string } } }).response?.data?.error || 'Failed to convert currency');
    }
  });
};