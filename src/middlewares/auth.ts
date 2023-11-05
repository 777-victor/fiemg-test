/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';
import ApiError from '@helpers/ApiError';
import { verifyToken } from '@helpers/jwtHelper';

interface TokenPayload {
  id: number;
  iat: number;
  exp: number;
}

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new ApiError(httpStatus.FORBIDDEN, 'Token was not provided.');
    }

    const [, token] = authHeader.split(' ');
    const decoded = await verifyToken(token);
    const { id, iat, exp } = decoded as TokenPayload;

    req.userInfo = {
      id,
      iat,
      exp,
    };
  } catch (err: ApiError | Error | undefined | any) {
    let message = 'Invalid token';
    if (err?.message) {
      message = err.message;
    }
    return next(new ApiError(httpStatus.FORBIDDEN, message));
  }

  return next();
};
