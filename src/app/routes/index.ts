import express from 'express';
import tourRouter from '../../module/Tour/Tour.route';
import authRouter from '../../module/User/Auth/route';
import userRouter from '../../module/User/Register/register.route';
import { BlogRoutes } from '../modules/blog/blog.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/blog',
    route: BlogRoutes,
  },
  {
    path: '/register',
    route: userRouter,
  },
  {
    path: '/user',
    route: authRouter,
  },
  {
    path: '/create',
    route: tourRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
