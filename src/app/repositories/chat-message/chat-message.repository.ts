import { TransactionOrKnex } from 'objection';
import { ChatMessageEntity } from '../../entities/chat-message/chat-message.entity';
import { DB } from '../../database';
import { IChatMessageRepository } from './chat-message.repository.types';

export class ChatMessageRepository implements IChatMessageRepository {
  protected entity: typeof ChatMessageEntity;
  public connection: TransactionOrKnex;

  constructor(connection?: TransactionOrKnex) {
    this.connection = connection || DB.getInstance().getConnection();
    this.entity = ChatMessageEntity;
  }

  /**
   * Find all chat messages
   */
  public findAll = async (limit = 0): Promise<ChatMessageEntity[]> => {
    return this.entity
      .query(this.connection)
      .withGraphFetched('user')
      .modify(queryBuilder => {
        if (limit > 0) {
          queryBuilder.limit(limit);
        }
      })
      .orderBy('id', 'desc')
      .execute();
  };

  /**
   * Get last n chat messages
   *
   * @param limit
   */
  public getLast = async (limit = 10): Promise<ChatMessageEntity[]> => {
    const subquery1 = this.entity
      .query(this.connection)
      .orderBy('id', 'desc')
      .limit(limit)
      .as('sub');

    return this.entity
      .query(this.connection)
      .withGraphFetched('user')
      .select('*')
      .from(subquery1)
      .orderBy('id', 'asc')
      .execute();
  };

  /**
   * Find chat message by id
   *
   * @param id
   */
  public findById = async (id: number): Promise<ChatMessageEntity | undefined> => {
    return this.entity
      .query(this.connection)
      .findById(id)
      .withGraphFetched('user')
      .execute();
  };
}
