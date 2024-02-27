import express from 'express';
import { BlogRoutes } from '../modules/blog/blog.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/blog',
    route: BlogRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
