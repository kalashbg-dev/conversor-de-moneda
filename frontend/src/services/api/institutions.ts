import { api } from '@/lib/axios';
import type { Institution } from '@/types/api';

export const institutionApi = {
  getAll: () => 
    api.get<Institution[]>('/institutions'),
  
  create: (data: { name: string; country?: string | null }) =>
    api.post<Institution>('/institutions', data),
  
  update: (id: string, data: { name: string; country?: string | null }) =>
    api.put<Institution>(`/institutions/${id}`, data),
  
  delete: (id: string) =>
    api.delete(`/institutions/${id}`),
};