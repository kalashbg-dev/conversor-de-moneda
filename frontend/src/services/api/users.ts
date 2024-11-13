import { api } from '@/lib/axios';
import type { User } from '@/types/api';
import type {Roles} from '@/constants/roles';
interface UpdateUserData {
  username: string;
  email: string;
  name: string;
  role: typeof Roles[keyof typeof Roles]; // or keyof typeof Roles if Roles is an enum
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