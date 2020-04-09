import { Request, Response, NextFunction } from 'express';
import { DB } from '../database';
import { TokenService } from '../services/token/token.service';
import { UserRepository } from '../repositories/user/user.repository';
import { UnauthorizedException } from '../exceptions/unauthorized.exception';
import { TDecoded } from '../services/token/token.service.types';

function getToken(req: Request): string | null {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }

  return null;
}

export async function isAuthorizedMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const token = getToken(req);
    if (!token) return next(new UnauthorizedException());

    // Decode JWT token
    const decoded = new TokenService().verify(token, process.env.JWT_SECRET);

    // Find user by decoded token
    const userRepository = new UserRepository(DB.getInstance().getConnection());
    const user = await userRepository.findByToken((decoded as TDecoded).user_token);

    if (!user) return next(new UnauthorizedException());

    req.user = user;
    return next();
  } catch (e) {
    return next(e);
  }
}
