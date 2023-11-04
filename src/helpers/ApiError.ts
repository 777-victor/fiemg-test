export interface ErrorList {
  item?: string;
  message: string;
}

export default class ApiError extends Error {
  statusCode: number;
  errors?: ErrorList[] | undefined;
  isOperational: boolean;

  constructor(
    statusCode: number,
    message: string | undefined,
    errors?: ErrorList[] | undefined,
    isOperational = true,
    stack = '',
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.isOperational = isOperational;

    if (stack !== '') {
      this.stack = stack;
    } else Error.captureStackTrace(this, this.constructor);
  }
}
