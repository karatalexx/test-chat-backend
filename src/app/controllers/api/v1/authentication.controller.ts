import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status-codes';
import { BaseController } from './base.controller';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { getValidator } from '../../../validators/api/v1';

export class AuthenticationController extends BaseController {
  protected authenticationService: AuthenticationService;

  constructor() {
    super();
    this.authenticationService = new AuthenticationService();
  }

  /**
   * Authentication via email: password
   *
   * METHOD: POST
   * URL: /api/v1/authentication
   * @param req
   * @param res
   * @param next
   */
  public attempt = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { data } = await getValidator('authentication.attempt').attempt(req.body);
      const result = await this.authenticationService.attempt({ ...data });

      return res.status(httpStatus.OK).json({
        data: {
          ...result
        }
      });
    } catch (e) {
      return next(e);
    }
  };
}
