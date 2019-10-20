import { ErrorRequestHandler, RequestHandler } from 'express';

import { isHttpError } from '../helpers/http-error';

abstract class ErrorMiddleware {
  public static notFoundHandler(): RequestHandler {
    return (req, res, next) => {
      res.status(404).json({
        error: {
          message: 'Not found',
        },
      });
    };
  }

  public static exceptionHandler(): ErrorRequestHandler {
    return (err, req, res, next) => {
      let status: number;
      if (isHttpError(err)) {
        status = err.status;
      } else {
        status = 500;
      }
      const env = process.env.NODE_ENV;
      const message =
        env === 'production' && status === 500
          ? 'Internal server error'
          : err.message;
      res.status(status).json({
        error: {
          message,
        },
      });
    };
  }
}

export default ErrorMiddleware;
