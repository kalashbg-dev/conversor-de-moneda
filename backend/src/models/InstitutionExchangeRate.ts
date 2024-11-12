import mongoose, { Schema, model, Document } from 'mongoose';

interface IInstitutionExchangeRate extends Document {
  currencyFrom: string;
  currencyTo: string;
  exchangeRate: number;
  institution: mongoose.Types.ObjectId;
  update_date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const institutionExchangeRateSchema = new Schema<IInstitutionExchangeRate>(
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
    institution: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Institution', 
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

institutionExchangeRateSchema.index({ currencyFrom: 1, currencyTo: 1, institution: 1 }, { unique: true });

const InstitutionExchangeRate = model<IInstitutionExchangeRate>('InstitutionExchangeRate', institutionExchangeRateSchema);

export default InstitutionExchangeRate;
