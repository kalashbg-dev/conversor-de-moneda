import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  _id: string;
  username: string;
  password: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  isConfirmed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: { 
      type: String, 
      required: true, 
      unique: true 
    },
    password: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true 
    },
    name: { 
      type: String, 
      required: true 
    },
    role: { 
      type: String, 
      enum: ['user', 'admin'], 
      required: true 
    },
    isConfirmed: { 
      type: Boolean, 
      default: false 
    }
  },
  {
    timestamps: true, // enable timestamps
    versionKey: false // disable __v
  }
);

const User = model<IUser>('User', userSchema);

export default User;
