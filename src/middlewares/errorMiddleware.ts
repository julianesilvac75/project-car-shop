// REFERENCIA: conteudo do course da Trybe do bloco 30

import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { errorCatalog, ErrorTypes } from '../helpers/errorCatalog';
import StatusCodes from '../helpers/StatusCodes';

const errorMiddleware: ErrorRequestHandler = (
  err: Error | ZodError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof ZodError) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: err.issues });
  }

  const messageAsErrorType = err.message as keyof typeof ErrorTypes;

  const mappedError = errorCatalog[messageAsErrorType];

  if (mappedError) {
    const { httpStatus, message } = mappedError;
    return res.status(httpStatus).json({ error: message });
  }

  console.log(err);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong' });  
};

export default errorMiddleware;
