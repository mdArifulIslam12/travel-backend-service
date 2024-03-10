/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import catchAsync from '../../../../shared/catchAsync';
import sendResponse from '../../../../shared/sendResponse';
import { registerService } from './register.service';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const result = await registerService.createUser(data);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User Register successful',
  });
});

const findDataFromDb = catchAsync(async (req: Request, res: Response) => {
  const result = await registerService.findDataFromDb();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User retrived successful',
    data: result,
  });
});

const findSingleDataFromDb = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.userId;
  const result = await registerService.findSingleDataFromDb(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Single User retrived successful',
    data: result,
  });
});
const upUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = req.body;
  const result = await registerService.upRegister(id, user);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'update user successful',
    data: result,
  });
});
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await registerService.deleteUser(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Deleted user successful',
    data: result,
  });
});

export const registerController = {
  createUser,
  findDataFromDb,
  findSingleDataFromDb,
  upUser,
  deleteUser,
};
