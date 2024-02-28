import { Router } from 'express';
import auth from '../../app/middlewares/auth';
import { USER_ROLE } from '../../role/role';
import { TourController } from './Tour.Controller';

const tourRouter = Router();

tourRouter.post(
  '/tour',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  TourController.createTour,
);

export default tourRouter;
