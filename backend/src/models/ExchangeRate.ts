import { Schema, model } from 'mongoose';

interface IExchangeRate extends Document {
  currencyFrom: string;
  currencyTo: string;
  exchangeRate: number;
}

const exchangeRateSchema = new Schema<IExchangeRate>(
  {
    currencyFrom: { 
      type: String, 
      required: true 
    },
    currencyTo: { 
      type: String, 
      required: true 
    },
    exchangeRate: { 
      type: Number, 
      required: true 
    },
  },
  {
    timestamps: true, // enable timestamps
    versionKey: false // disable __v
  }
);

const ExchangeRate = model<IExchangeRate>('ExchangeRate', exchangeRateSchema);

export default ExchangeRate;
