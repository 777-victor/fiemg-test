/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import * as Yup from 'yup';
import { NextFunction, Request, Response } from 'express';
import { validateSchema, yupErrorHandler } from '@helpers/validateErrorHandler';

export default class UniversityValidator {
  async listValidator(req: Request, res: Response, next: NextFunction) {
    const schema = Yup.object().shape({
      country: Yup.string(),
      code: Yup.string(),
      alphaTwoCode: Yup.string(),
      page: Yup.number(),
      limit: Yup.number(),
    });

    try {
      await validateSchema(req.query, schema);
    } catch (error: Yup.ValidationError | any | undefined) {
      next(yupErrorHandler(error));
    }

    next();
  }
}
