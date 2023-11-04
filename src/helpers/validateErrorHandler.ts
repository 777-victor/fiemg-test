import * as Yup from 'yup';
import ApiError, { ErrorList } from './ApiError';
import httpStatus from 'http-status';

const yupErrorHandler = (
  error: Yup.ValidationError | any | undefined,
): ApiError => {
  const errorMessage = 'Validation error';

  const errorsList: ErrorList[] = error.inner.map(
    (item: Yup.ValidationError) => {
      return {
        item: item.path,
        message: item.errors[0],
      };
    },
  );

  return new ApiError(
    httpStatus.UNPROCESSABLE_ENTITY,
    errorMessage,
    errorsList,
  );
};

const validateSchema = async (
  requestBody: any,
  schema: Yup.ObjectSchema<any>,
) => {
  const yupValidateOptions = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };

  await schema.validate(requestBody, yupValidateOptions);

  return true;
};

export { validateSchema, yupErrorHandler };
