import { Request, Response, NextFunction } from 'express';
import { BaseController } from './base.controller';
import httpStatus from 'http-status-codes';
import { SignUpService } from '../../../services/signup/signup.service';
import { getValidator } from '../../../validators/api/v1';

export class SignUpController extends BaseController {
  protected signUpService: SignUpService;

  constructor() {
    super();
    this.signUpService = new SignUpService();
  }

  /**
   * Sign up attempt
   *
   * METHOD: POST
   * URL: /api/v1/signup
   * @param req
   * @param res
   * @param next
   */
  public attempt = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { data } = await getValidator('sign-up.attempt').attempt(req.body);
      const result = await this.signUpService.attempt({ ...data });

      return res.status(httpStatus.OK).json({
        data: { ...result }
      });
    } catch (e) {
      return next(e);
    }
  };
}
