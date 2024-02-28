import { Router } from 'express';
import auth from '../../../app/middlewares/auth';
import { USER_ROLE } from '../../../role/role';
import { loginController } from './controller';

const authRouter = Router();

authRouter.post('/login', loginController.loginUser);
authRouter.patch(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.user, USER_ROLE.superAdmin),
  loginController.changePassword,
);

export default authRouter;
