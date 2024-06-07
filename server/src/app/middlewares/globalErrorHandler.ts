import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import handleZodError from "../errors/handleZodError";

const globalErrorHandler = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || "Something went wrong!";
  let errorDetails = error;

  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorDetails = simplifiedError?.errorDetails;
  }

  //ultimate return
  return res.status(statusCode).json({
    success: false,
    message,
    errorDetails,
  });
};
export default globalErrorHandler;
