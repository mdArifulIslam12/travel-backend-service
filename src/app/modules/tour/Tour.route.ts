import { Router } from 'express';
import { USER_ROLE } from '../../../role/role';
import auth from '../../middlewares/auth';
import { TourController } from './Tour.Controller';

const tourRouter = Router();

tourRouter.post(
  '/tour',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  TourController.createTour,
);

export default tourRouter;
