import { ZodError, ZodIssue } from "zod";

const handleZodError = (err: ZodError) => {
  const errorSources = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  const statusCode = 400;
  const error = errorSources
    .map((error) => `${error.path} is ${error.message}`)
    .join(". ");
  return {
    statusCode,
    message: error,
    errorDetails: err,
  };
};

export default handleZodError;
