import mongoose, { Schema, Document, Model } from 'mongoose';

interface IUser extends Document {
  _id: string;
  username: string;
  password: string;
  email: string; 
  name: string;  
  role: 'user' | 'admin';
  isConfirmed: boolean; 
}

const userSchema: Schema<IUser> = new Schema({
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
    default: 'user'
  },
  isConfirmed: { 
    type: Boolean,
    default: false
  }
}, {
    timestamps: true,
    versionKey: false
  });

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export default User;
