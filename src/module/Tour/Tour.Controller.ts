/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { TourService } from './Tour.Service';

const createTour = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const result = await TourService.createTour(data);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Tour Tour successful',
  });
});

const findDataFromDb = catchAsync(async (req: Request, res: Response) => {
  const result = await TourService.findDataFromDb();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Tour retrived successful',
    data: result,
  });
});

const findSingleDataFromDb = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.TourId;
  const result = await TourService.findSingleDataFromDb(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Single Tour retrived successful',
    data: result,
  });
});
const upTour = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const Tour = req.body;
  const result = await TourService.upTour(id, Tour);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'update Tour successful',
    data: result,
  });
});
const deleteTour = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await TourService.deleteTour(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Deleted Tour successful',
    data: result,
  });
});

export const TourController = {
  createTour,
  findDataFromDb,
  findSingleDataFromDb,
  upTour,
  deleteTour,
};
