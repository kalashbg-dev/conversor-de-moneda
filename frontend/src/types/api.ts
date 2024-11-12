export interface Institution {
  _id: string;
  name: string;
  country?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  isConfirmed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ExchangeRate {
  _id: Key | null | undefined;
  currencyTo: ReactNode;
  updatedAt(updatedAt: any): import("react").ReactNode;
  exchangeRate: any;
  currencyFrom: ReactNode;
  id: string;
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  date: string;
}

export interface Conversion {
  _id: Key | null | undefined;
  currencyTo: any;
  currencyFrom: any;
  id: string;
  amount: number;
  fromCurrency: string;
  toCurrency: string;
  result: number;
  date: string;
  userId: string;
}