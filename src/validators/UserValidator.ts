/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import * as Yup from 'yup';
import { NextFunction, Request, Response } from 'express';
import { validateSchema, yupErrorHandler } from '@helpers/validateErrorHandler';

export default class UserValidator {
  async userCreateValidator(req: Request, res: Response, next: NextFunction) {
    const schema = Yup.object().shape({
      name: Yup.string().max(100).required("'name' is required"),
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

  async userUpdateValidator(req: Request, res: Response, next: NextFunction) {
    req.body.id = req.params.id ?? null;

    const schema = Yup.object().shape({
      id: Yup.number().required("'id' is required"),
      name: Yup.string().max(100).required("'name' is required"),
      email: Yup.string().email().max(150).required("'email' is required"),
      password: Yup.string().min(8).max(150).nullable(),
    });

    try {
      await validateSchema(req.body, schema);
    } catch (error: Yup.ValidationError | any | undefined) {
      next(yupErrorHandler(error));
    }

    next();
  }

  async paramsIdValidator(req: Request, res: Response, next: NextFunction) {
    req.body.id = req.params.id ?? null;

    const schema = Yup.object().shape({
      id: Yup.number().required("'id' is required"),
    });

    try {
      await validateSchema(req.body, schema);
    } catch (error: Yup.ValidationError | any | undefined) {
      next(yupErrorHandler(error));
    }

    next();
  }
}
