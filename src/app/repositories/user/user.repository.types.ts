import { UserEntity } from '../../entities/user/user.entity';

export interface IUserRepository {
  findAll(): Promise<UserEntity[]>;
  findById(id: number): Promise<UserEntity | undefined>;
  findByEmail(email: string): Promise<UserEntity | undefined>;
  findByUsername(username: string): Promise<UserEntity | undefined>;
  findByToken(token: string): Promise<UserEntity | undefined>;
}
