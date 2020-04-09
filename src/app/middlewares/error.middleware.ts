import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status-codes';
import { ValidationError } from 'ajv';
import { MessagesHelper } from '../helpers/messages';
import { ValidationException } from '../exceptions/validation.exception';

/**
 * Basic error response
 *
 * @param res
 * @param e
 */
function basicErrorResponse(res: Response, e: any): Response {
  return res.status(httpStatus.BAD_REQUEST).json({
    status: httpStatus.getStatusText(httpStatus.BAD_REQUEST),
    statusCode: httpStatus.BAD_REQUEST,
    error: e.message
  });
}

/**
 * AJV Validation error response
 *
 * @param res
 * @param e
 */
function ajvValidationErrorResponse(res: Response, e: ValidationError): Response {
  return res.status(httpStatus.BAD_REQUEST).json({
    status: httpStatus.getStatusText(httpStatus.BAD_REQUEST),
    statusCode: httpStatus.BAD_REQUEST,
    message: MessagesHelper.VALIDATION_ERROR,
    errors: e.errors.reduce((acc: any, cur: any) => {
      const key = cur.dataPath.substring(1);
      if (!acc[key]) {
        acc[key] = [];
      }

      acc[key].push({
        message: cur.message
      });

      return acc;
    }, {})
  });
}

/**
 * Validation error response
 *
 * @param res
 * @param e
 */
function validationErrorResponse(res: Response, e: ValidationException): Response {
  return res.status(httpStatus.BAD_REQUEST).json({
    status: httpStatus.getStatusText(httpStatus.BAD_REQUEST),
    statusCode: httpStatus.BAD_REQUEST,
    message: MessagesHelper.VALIDATION_ERROR,
    errors: e.errors.reduce((acc: any, curr: any) => {
      const key = curr.key;
      if (!acc[key]) {
        acc[key] = [];
      }

      acc[key].push({
        message: curr.message
      });

      return acc;
    }, {})
  });
}

export function errorMiddleware(e: any, req: Request, res: Response, next: NextFunction): Response {
  // Ajv validation error
  if (e.ajv) return ajvValidationErrorResponse(res, e);

  // Custom validation error
  if (e.custom_validation) return validationErrorResponse(res, e);

  return basicErrorResponse(res, e);
}
