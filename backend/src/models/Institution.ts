import { Schema, model, Document } from 'mongoose';

interface IInstitution extends Document {
    _id: string;
  name: string;
  country?: string;
  createdAt: Date;
  updatedAt: Date;
}

const institutionSchema = new Schema<IInstitution>(
  {
    name: { 
      type: String, 
      required: true 
    },
    country: { 
      type: String, 
      default: null 
    }
  },
  {
    timestamps: true, // enable timestamps
    versionKey: false // disable __v
  }
);

const Institution = model<IInstitution>('Institution', institutionSchema);

export default Institution;
