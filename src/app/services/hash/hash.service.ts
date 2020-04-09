import { verify, hash, Options } from 'argon2';
import { IHashService } from './hash.service.types';

export class HashService implements IHashService {
  /**
   * Verify hash against password
   *
   * @param hash
   * @param plain
   * @param options
   */
  public verify = async (hash: string, plain: Buffer | string, options?: Options): Promise<boolean> => {
    return verify(hash, plain, options);
  };

  /**
   * Make hash
   *
   * @param plain
   * @param options
   */
  public hash = async (plain: Buffer | string, options?: Options & { raw?: false }): Promise<string> => {
    return hash(plain, options);
  };
}
