import bcrypt from 'bcrypt';
import { JwtPayload } from 'jsonwebtoken';
import config from '../../../../config';
import { Register } from '../Register/register.model';
import { createToken } from './authUtils';
import { TCngPass, TLogin } from './interface';

const loginUser = async (payload: TLogin) => {
  const user = await Register.findOne({ email: payload?.email });
  if (!user) {
    throw new Error('User not found');
  }
  const PlainPassword = payload?.password;
  const hashPassword = user?.password;
  const isExistPassword = await bcrypt.compare(PlainPassword, hashPassword);

  if (!isExistPassword) {
    throw new Error('Password do not match');
  }

  const userPayload = {
    id: user?._id,
    email: user?.email,
    name: user?.name,
    role: user?.role,
  };

  const token = createToken(
    userPayload,
    config.jwt.secret as string,
    config.jwt.expires_in as string,
  );
  return {
    token,
  };
};

const changePassword = async (
  user: JwtPayload | null,
  cngPassword: TCngPass,
) => {
  const isExistsId = await Register.findById(user?.id);
  if (!isExistsId) {
    throw new Error('This user not found');
  }
  const role = user?.role;
  const dbRole = isExistsId?.role;
  if (role !== dbRole) {
    throw new Error("don't match role");
  }

  const isPassword = isExistsId?.password;
  const isExistsPassword = await bcrypt.compare(
    cngPassword?.currentPassword,
    isPassword,
  );
  if (!isExistsPassword) {
    throw new Error("didn't match current password with new password");
  }

  const password = cngPassword?.newPassword;
  if (password == cngPassword?.currentPassword) {
    throw new Error(
      'Password change failed. matched new password with current password',
    );
  }
  const newHashPass = await bcrypt.hash(password, Number(10));

  const result = await Register.findByIdAndUpdate(
    { _id: user?.id },
    { password: newHashPass },
  );

  return result;
};

export const loginService = {
  loginUser,
  changePassword,
};
