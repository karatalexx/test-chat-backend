import { HashService } from '../hash/hash.service';
import { TokenService } from '../token/token.service';
import { UserRepository } from '../../repositories/user/user.repository';
import { UserCredentialsAreNotValidException } from '../../exceptions/user-credentials-are-not-valid.exception';
import { UserNotFoundException } from '../../exceptions/user-not-found.exception';
import { ValidationException } from '../../exceptions/validation.exception';
import { IAuthenticationService, RTAttempt, TAttemptData } from './authentication.service.types';

export class AuthenticationService implements IAuthenticationService {
  protected hashService: HashService;
  protected tokenService: TokenService;
  protected userRepository: UserRepository;

  constructor() {
    this.hashService = new HashService();
    this.tokenService = new TokenService();
    this.userRepository = new UserRepository();
  }

  /**
   * Attempt to authenticate
   *
   * @param data
   */
  public attempt = async (data: TAttemptData): Promise<RTAttempt> => {
    // Find user by email
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) throw new ValidationException([new UserNotFoundException()]);

    // Check user hash against input
    if (!(await this.hashService.verify(user.password, data.password))) {
      throw new ValidationException([new UserCredentialsAreNotValidException()]);
    }

    // Sign new JWT token
    const { JWT_SECRET, JWT_ACCESS_TOKEN_TTL } = process.env;

    return {
      // Generate access token
      access_token: this.tokenService.generateAccessToken(
        {
          type: TokenService.TYPES.ACCESS_TOKEN,
          user_token: user.token
        },
        JWT_SECRET,
        { expiresIn: JWT_ACCESS_TOKEN_TTL }
      ),
      expiresIn: JWT_ACCESS_TOKEN_TTL
    };
  };
}
