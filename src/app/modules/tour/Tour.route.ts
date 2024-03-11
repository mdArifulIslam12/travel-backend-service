import { Router } from 'express';
import { TourController } from './Tour.Controller';

const tourRouter = Router();

tourRouter.get('/:id', TourController.findSingleDataFromDb);
tourRouter.post('/create-tour', TourController.createTour);
tourRouter.get('/', TourController.findDataFromDb);
tourRouter.patch('/:id', TourController.findSingleDataFromDb);
tourRouter.delete('/:id', TourController.findSingleDataFromDb);

export default tourRouter;
