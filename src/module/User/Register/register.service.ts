import { TRegister } from './register.interface';
import { Register } from './register.model';

const createUser = async (payload: TRegister) => {
  const isExistEmail = await Register.findOne({ email: payload?.email });
  if (isExistEmail) {
    throw new Error('Email already exist');
  }

  const result = await Register.create({ ...payload, role: 'user' });

  return result;
};

const findDataFromDb = async () => {
  const result = await Register.find();
  return result;
};

const findSingleDataFromDb = async (id: string) => {
  const result = await Register.findById(id);
  return result;
};

const upRegister = async (id: string, payload: Partial<TRegister>) => {
  const result = await Register.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteUser = async (id: string) => {
  const result = Register.findByIdAndDelete(id);
  return result;
};

export const registerService = {
  createUser,
  findDataFromDb,
  findSingleDataFromDb,
  upRegister,
  deleteUser,
};
