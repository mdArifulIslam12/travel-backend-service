import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import { Register } from '../../module/User/Register/register.model';
import { USER_ROLE } from '../../role/role';

type TUserRole = keyof typeof USER_ROLE;

const auth =
  (...requiredRoles: TUserRole[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get authorization token
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
      }
      // verify token
      const decoded = jwt.verify(
        token,
        config.jwt.secret as string,
      ) as JwtPayload;
      console.log('decoded compoonent', decoded);
      const { name, email, role } = decoded as JwtPayload;
      const isExistName = await Register.findOne({ name });
      const isExistEmail = await Register.findOne({ email });
      if (!isExistName) {
        throw new Error('Unauthorize user check your name');
      }

      if (!isExistEmail) {
        throw new Error('Unauthorize user check your email');
      }

      if (requiredRoles && !requiredRoles.includes(role)) {
        throw new Error('Unauthorize user do not match role');
      }

      req.user = decoded as JwtPayload;
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
