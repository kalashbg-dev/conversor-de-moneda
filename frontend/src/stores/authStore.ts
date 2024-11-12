// El estado de autenticaci n se almacena en el localStorage para que persista entre sesiones.
// El estado de autenticaci n se almacena en el objeto "auth-storage" y se serializa a JSON.
// Si el estado de autenticaci n ya existe en el localStorage, se utiliza ese valor y se deserializa a un objeto.
// Si el estado de autenticaci n no existe en el localStorage, se crea un objeto vac o.
// La funci n setAuth se utiliza para actualizar el estado de autenticaci n.
// La funci n login se utiliza para autenticar a un usuario y actualizar el estado de autenticaci n.
// La funci n register se utiliza para registrar a un usuario.
// La funci n logout se utiliza para cerrar la sesi n del usuario y eliminar el estado de autenticaci n del localStorage.

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from '@/lib/axios';
import type { LoginCredentials, RegisterData, AuthResponse } from '@/types/auth';

interface AuthState {
  token: string | null;
  role: string | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  setAuth: (token: string, role: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      role: null,
      isAuthenticated: false,
      setAuth: (token: string, role: string) => {
        set({ token, role, isAuthenticated: true });
      },
      login: async (credentials: LoginCredentials) => {
        const { data } = await api.post<AuthResponse>('/users/login', credentials);
        if (data.token && data.role) {
          set({ token: data.token, role: data.role, isAuthenticated: true });
        }
      },
      register: async (data: RegisterData) => {
        await api.post<AuthResponse>('/users/register', data);
      },
      logout: () => {
        set({ token: null, role: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        token: state.token, 
        role: state.role, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);
