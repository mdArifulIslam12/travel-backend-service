import { Router } from 'express';
import { registerController } from './register.controller';

const userRouter = Router();

userRouter.post('/user', registerController.createUser);
userRouter.get('/user', registerController.findDataFromDb);
userRouter.delete('/delete/:id', registerController.deleteUser);
// userRouter.post('/register-user', registerController.createUser);

export default userRouter;
