import { TransactionOrKnex } from 'objection';
import { DB } from '../../database';
import { UserEntity } from '../../entities/user/user.entity';
import { HashService } from '../hash/hash.service';
import { TokenService } from '../token/token.service';
import { UserRepository } from '../../repositories/user/user.repository';
import { ISignUpService, RTAttempt, TAttemptData } from './signup.service.types';
import { ValidationException } from '../../exceptions/validation.exception';
import { UserWithEmailAlreadyExistException } from '../../exceptions/user-with-email-already-exist.exception';
import { UserWithUsernameAlreadyExistException } from '../../exceptions/user-with-username-already-exist.exception';

export class SignUpService implements ISignUpService {
  protected connection?: TransactionOrKnex;
  protected userRepository: UserRepository;
  protected entity: typeof UserEntity;
  protected hashService: HashService;
  protected tokenService: TokenService;

  constructor(connection?: TransactionOrKnex) {
    this.connection = connection || DB.getInstance().getConnection();
    this.userRepository = new UserRepository(this.connection);
    this.entity = UserEntity;
    this.hashService = new HashService();
    this.tokenService = new TokenService();
  }

  /**
   * Attempt to sign up new user
   *
   * @param data
   */
  public attempt = async (data: TAttemptData): Promise<RTAttempt> => {
    // Check if user email and username is available
    const [isEmailExist, isUserNameExist] = await Promise.all([
      this.userRepository.findByEmail(data.email),
      this.userRepository.findByUsername(data.username)
    ]);
    const errors: Error[] = [];
    if (isEmailExist) errors.push(new UserWithEmailAlreadyExistException());
    if (isUserNameExist) errors.push(new UserWithUsernameAlreadyExistException());
    if (errors.length) throw new ValidationException(errors);

    // Create password hash
    const hash = await this.hashService.hash(data.password);

    // Create UUID for token field, use as unique id in JWT
    const token = this.tokenService.generateUUIDV4();

    // Create user
    await this.entity
      .query(this.connection)
      .insert({
        ...data,
        password: hash,
        token
      })
      .execute();

    // Sign new JWT token
    const { JWT_SECRET, JWT_ACCESS_TOKEN_TTL } = process.env;

    return {
      // Generate access token
      access_token: this.tokenService.generateAccessToken(
        {
          type: TokenService.TYPES.ACCESS_TOKEN,
          user_token: token
        },
        JWT_SECRET,
        { expiresIn: JWT_ACCESS_TOKEN_TTL }
      ),
      expiresIn: JWT_ACCESS_TOKEN_TTL
    };
  };
}
