import { Roles } from '@/constants/roles';

export interface Institution {
  _id: string;
  name: string;
  country?: string | null;
  img?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  name: string;
  role: typeof Roles[keyof typeof Roles];
  isConfirmed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BaseExchangeRate {
  _id: string;
  currencyFrom: string;
  currencyTo: string;
  exchangeRate: number;
  updatedAt: string;
}

export interface ExchangeRate extends BaseExchangeRate {
  id: string;
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  date: string;
}

export interface Conversion {
  _id: string;
  currencyTo: string;
  currencyFrom: string;
  id: string;
  amount: number;
  fromCurrency: string;
  toCurrency: string;
  result: number;
  date: string;
  userId: string;
}

export interface InstitutionExchangeRate extends BaseExchangeRate {
  institution: {
    _id: string;
    name: string;
  };
}

export interface ApiError {
  response?: {
    status?: number;
    data?: {
      message?: string;
      error?: string;
    };
  };
}