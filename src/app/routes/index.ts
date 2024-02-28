import express from 'express';
import tourRouter from '../modules/Tour/Tour.route';
import authRouter from '../modules/User/Auth/route';
import userRouter from '../modules/User/Register/register.route';
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
    path: '/tour',
    route: tourRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
