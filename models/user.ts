import mongoose, { Schema, Document } from 'mongoose';

export interface UserSchema extends Document {
  username: string;
  name: string;
  password: string;
  email: string;
  phone: number;
  address: string;
  gender: string;
  role: string;
}

const userSchema: Schema<UserSchema> = new Schema<UserSchema>(
  {
    username: {
      type: String,
    },
    name: {
      type: String,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: Number,
    },
    address: {
      type: String,
    },
    gender: {
      type: String,
    },
    role: {
      type: String,
      default: 'User',
    },
  },
  { versionKey: false, collection: 'users' }
);

export default mongoose.model<UserSchema>('users', userSchema);
