export type TRegister = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role?: 'superAdmin' | 'admin' | 'user';
  image: string;
};
