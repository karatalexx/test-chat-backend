import { Secret } from 'jsonwebtoken';

export type TDecoded = {
  type: string;
  user_token: string;
  iat: number;
  exp: number;
};

export interface ITokenService {
  verify: (token: string, secret: Secret) => object | string;
  generateAccessToken: (payload: string | Buffer | object, secret: Secret) => string;
  generateUUIDV4: () => string;
}
