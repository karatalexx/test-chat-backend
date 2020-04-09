import jwt, { Secret, SignOptions, VerifyOptions } from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { ITokenService } from './token.service.types';

export class TokenService implements ITokenService {
  public static readonly TYPES = {
    ACCESS_TOKEN: 'access token'
  };

  /**
   * Verify token
   *
   * @param token
   * @param secret
   * @param options
   */
  public verify = (token: string, secret: Secret, options?: VerifyOptions): object | string => {
    return jwt.verify(token, secret, options);
  };

  /**
   * Generate access token
   */
  public generateAccessToken = (
    payload: string | Buffer | object,
    secretOrPrivateKey: Secret,
    options?: SignOptions
  ): string => jwt.sign(payload, secretOrPrivateKey, options);

  /**
   * Generate UUID V4
   */
  public generateUUIDV4 = (): string => uuidv4();
}
