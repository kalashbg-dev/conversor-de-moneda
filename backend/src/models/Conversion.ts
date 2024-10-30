import mongoose, { Document, Schema } from 'mongoose';

export interface ConversionDocument extends Document {
  amount: number;
  currencyFrom: string;
  currencyTo: string;
  result: number;
  timestamp: Date;
}

const ConversionSchema: Schema = new Schema({
  amount: { type: Number, required: true },
  currencyFrom: { type: String, required: true },
  currencyTo: { type: String, required: true },
  result: { type: Number, required: true },
},
  {
    timestamps: true,
    versionKey: false
  });

export default mongoose.model<ConversionDocument>('Conversion', ConversionSchema);
