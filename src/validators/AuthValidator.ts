/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import * as Yup from 'yup';
import { NextFunction, Request, Response } from 'express';
import { validateSchema, yupErrorHandler } from '@helpers/validateErrorHandler';

export default class AuthValidator {
  async loginValidator(req: Request, res: Response, next: NextFunction) {
    const schema = Yup.object().shape({
      email: Yup.string().email().max(150).required("'email' is required"),
      password: Yup.string().min(8).max(150).required("'password' is required"),
    });

    try {
      await validateSchema(req.body, schema);
    } catch (error: Yup.ValidationError | any | undefined) {
      next(yupErrorHandler(error));
    }

    next();
  }
}
