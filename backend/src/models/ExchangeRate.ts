// src/models/ExchangeRate.ts
import { Schema, model } from 'mongoose';

interface IExchangeRate {
  currencyFrom: string;
  currencyTo: string;
  exchangeRate: number;
}

const exchangeRateSchema = new Schema<IExchangeRate>(
  {
    currencyFrom: { type: String, required: true },
    currencyTo: { type: String, required: true },
    exchangeRate: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const ExchangeRate = model<IExchangeRate>('ExchangeRate', exchangeRateSchema);

export default ExchangeRate;
