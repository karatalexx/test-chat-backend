import { UserEntity } from '../../entities/user/user.entity';
import { TransactionOrKnex } from 'objection';
import { DB } from '../../database';
import { IUserRepository } from './user.repository.types';

export class UserRepository implements IUserRepository {
  protected entity: typeof UserEntity;
  protected connection: TransactionOrKnex;

  constructor(connection?: TransactionOrKnex) {
    this.connection = connection || DB.getInstance().getConnection();
    this.entity = UserEntity;
  }

  /**
   * Find user by id
   */
  public findAll = async (): Promise<UserEntity[]> => {
    return this.entity.query(this.connection).execute();
  };

  /**
   * Find user by id
   *
   * @param id
   */
  public findById = async (id: number): Promise<UserEntity | undefined> => {
    return this.entity
      .query(this.connection)
      .findById(id)
      .execute();
  };

  /**
   * Find user by email
   *
   * @param email
   */
  public findByEmail = async (email: string): Promise<UserEntity | undefined> => {
    return this.entity
      .query(this.connection)
      .where({ email })
      .first();
  };

  /**
   * Find user by username
   *
   * @param username
   */
  public findByUsername = async (username: string): Promise<UserEntity | undefined> => {
    return this.entity
      .query(this.connection)
      .where({ username })
      .first();
  };

  /**
   * Find user by token
   *
   * @param token
   */
  public findByToken = async (token: string): Promise<UserEntity | undefined> => {
    return this.entity
      .query(this.connection)
      .where({ token })
      .first();
  };
}
