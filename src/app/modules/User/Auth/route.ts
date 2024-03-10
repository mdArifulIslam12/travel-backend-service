import { Router } from 'express';
import { USER_ROLE } from '../../../../role/role';
import auth from '../../../middlewares/auth';
import { loginController } from './controller';

const authRouter = Router();

authRouter.post('/login', loginController.loginUser);
authRouter.patch(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.user, USER_ROLE.superAdmin),
  loginController.changePassword,
);

export default authRouter;
