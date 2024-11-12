export interface ExchangeRate {
  _id: string;
  currencyFrom: string;
  currencyTo: string;
  exchangeRate: number;
  update_date?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Institution {
  _id: string;
  name: string;
  country?: string;
}

export interface InstitutionExchangeRate extends ExchangeRate {
  institution: Institution;
}

export interface ConversionResult {
  amount: number;
  currencyFrom: string;
  currencyTo: string;
  result: number;
  date: string;
}