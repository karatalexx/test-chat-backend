import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status-codes';
import { BaseController } from './base.controller';

export class UserController extends BaseController {
  constructor() {
    super();
  }

  /**
   * Get current user
   *
   * METHOD: GET
   * URL: /api/v1/users/:id
   * @param req
   * @param res
   * @param next
   */
  public currentUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { user } = req;

      return res.status(httpStatus.OK).json({
        data: user
      });
    } catch (e) {
      return next(e);
    }
  };
}
