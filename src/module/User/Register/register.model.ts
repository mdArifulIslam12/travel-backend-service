import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import { TRegister } from './register.interface';
const registerSchema = new Schema<TRegister>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['superAdmin', 'admin', 'user'],
  },
  image: {
    type: String,
    required: true,
  },
});

registerSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB
  user.password = await bcrypt.hash(user.password, Number(10));
  user.confirmPassword = await bcrypt.hash(user.confirmPassword, Number(10));
  next();
});

export const Register = model<TRegister>('Register', registerSchema);
