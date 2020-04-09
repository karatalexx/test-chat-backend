import { Options } from 'argon2';

export interface IHashService {
  verify: (hash: string, plain: Buffer | string, options?: Options) => Promise<boolean>;
  hash: (plain: Buffer | string, options?: Options & { raw?: false }) => Promise<string>;
}
