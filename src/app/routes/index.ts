import { Request, Response, Router } from 'express';
import httpStatus from 'http-status-codes';
import { MessagesHelper } from '../helpers/messages';
import { SignUpController } from '../controllers/api/v1/signup.controller';
import { AuthenticationController } from '../controllers/api/v1/authentication.controller';
import { UserController } from '../controllers/api/v1/user.controller';
import { isAuthorizedMiddleware } from '../middlewares/is-authorized.middleware';

export function routes(router: Router): Router {
  // Sign up
  const signUpController = new SignUpController();
  router.post('/signup', signUpController.attempt);

  // Authentication
  const authenticationController = new AuthenticationController();
  router.post('/auth', authenticationController.attempt);

  // User
  const userController = new UserController();
  router.get('/user', [isAuthorizedMiddleware], userController.currentUser);

  // Route 404
  router.all('*', (req: Request, res: Response) => {
    res.status(httpStatus.NOT_FOUND).send(MessagesHelper.ROUTE_IS_NOT_FOUND);
  });

  return router;
}
