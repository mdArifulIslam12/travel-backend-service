import { Register } from '../module/User/Register/register.model';
import { USER_ROLE } from '../role/role';

const superAdminData = {
  name: 'kawsar',
  email: 'kawsar1@example.com',
  password: 'superAdmin12',
  confirmPassword: 'superAdmin12',
  role: USER_ROLE.superAdmin,
  image: 'profile.jpg',
};

const seedSuperAdmin = async () => {
  const isExistSuperAdmin = await Register.find({ role: USER_ROLE.superAdmin });
  if (isExistSuperAdmin.length == 0) {
    await Register.create(superAdminData);
  }
};

export default seedSuperAdmin;
