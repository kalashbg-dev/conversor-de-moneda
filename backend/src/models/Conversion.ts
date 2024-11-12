import mongoose, { Schema, model, Document } from 'mongoose';

interface IConversion extends Document {
  amount: number;
  currencyFrom: string;
  currencyTo: string;
  result: number;
  date: Date;
  exchange_rate_id?: mongoose.Types.ObjectId;
  institution_exchange_rate_id?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const conversionSchema = new Schema<IConversion>(
  {
    amount: { 
      type: Number, 
      required: true 
    },
    currencyFrom: { 
      type: String, 
      required: true 
    },
    currencyTo: { 
      type: String, 
      required: true 
    },
    result: { 
      type: Number, 
      required: true 
    },
    date: { 
      type: Date, 
      default: Date.now 
    },
    exchange_rate_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'ExchangeRate' 
    },
    institution_exchange_rate_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'InstitutionExchangeRate' 
    }
  },
  {
    timestamps: true, // enable timestamps
    versionKey: false // disable __v
  }
);

const Conversion = model<IConversion>('Conversion', conversionSchema);

export default Conversion;
