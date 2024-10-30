import mongoose, { Schema, Document, Model, ObjectId } from 'mongoose';

interface IUser extends Document {
  _id: string;
  username: string;
  password: string;
  role: 'user' | 'admin';
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
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, {
    timestamps: true,
    versionKey: false
  });

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export default User;
