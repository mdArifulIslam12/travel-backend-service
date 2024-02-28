import { Request, Response } from 'express';
import catchAsync from '../../../../shared/catchAsync';
import sendResponse from '../../../../shared/sendResponse';
import { loginService } from './service';
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { token } = await loginService.loginUser(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User login successful',
    data: {
      token,
    },
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const password = req.body;
  const user = req.user;

  const result = await loginService.changePassword(user, password);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Password changed successfully',
    data: result,
  });
});

export const loginController = {
  loginUser,
  changePassword,
};
