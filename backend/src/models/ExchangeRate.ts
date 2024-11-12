import { Schema, model, Document } from 'mongoose';

interface IExchangeRate extends Document {
  currencyFrom: string;
  currencyTo: string;
  exchangeRate: number;
  update_date: Date;
  createdAt: Date;
  updatedAt: Date;
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
    update_date: { 
      type: Date, 
      default: Date.now 
    }
  },
  {
    timestamps: true, // enable timestamps
    versionKey: false // disable __v
  }
);

exchangeRateSchema.index({ currencyFrom: 1, currencyTo: 1 }, { unique: true });

const ExchangeRate = model<IExchangeRate>('ExchangeRate', exchangeRateSchema);

export default ExchangeRate;
