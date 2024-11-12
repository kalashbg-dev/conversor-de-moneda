import { api } from '@/lib/axios';
import type { User } from '@/types/api';

interface UpdateUserData {
  username: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

export const userApi = {
  getAll: () => 
    api.get<User[]>('/users'),
  
  getById: (id: string) =>
    api.get<User>(`/users/${id}`),
  
  update: (id: string, data: UpdateUserData) =>
    api.put<User>(`/users/${id}`, data),
  
  delete: (id: string) =>
    api.delete(`/users/${id}`),
};