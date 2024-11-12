// src/models/ExchangeRateHistory.ts
import mongoose, { Schema, Document } from 'mongoose'

interface IExchangeRateHistory extends Document {
  currencyFrom: string
  currencyTo: string
  exchangeRate: number
  institution?: mongoose.Schema.Types.ObjectId // Si es una tasa de una institución
  date: Date
  createdAt: Date
  updatedAt: Date
}

const ExchangeRateHistorySchema: Schema = new Schema(
  {
    currencyFrom: { type: String, required: true },
    currencyTo: { type: String, required: true },
    exchangeRate: { type: Number, required: true },
    institution: { type: mongoose.Schema.Types.ObjectId, ref: 'Institution' },
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // habilita los campos createdAt y updatedAt automáticamente
    versionKey: false // desactiva el campo __v
  }
)

const ExchangeRateHistory = mongoose.model<IExchangeRateHistory>('ExchangeRateHistory', ExchangeRateHistorySchema)

export default ExchangeRateHistory
