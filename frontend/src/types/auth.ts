export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  password: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  role: string;
}

export interface AuthStore {
  token: string | null;
  role: string | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  setAuth: (token: string, role: string) => void;
}