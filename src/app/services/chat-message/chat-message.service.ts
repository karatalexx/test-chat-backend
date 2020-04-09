import { ModelObject, TransactionOrKnex } from 'objection';
import { DB } from '../../database';
import { ChatMessageEntity } from '../../entities/chat-message/chat-message.entity';
import { IChatMessageService } from './chat-message.service.types';

export class ChatMessageService implements IChatMessageService {
  protected connection: TransactionOrKnex;
  protected entity: typeof ChatMessageEntity;

  constructor(connection?: TransactionOrKnex) {
    this.connection = connection || DB.getInstance().getConnection();
    this.entity = ChatMessageEntity;
  }

  /**
   * Store new chat message
   *
   * @param data
   */
  public store = async (data: Partial<ModelObject<ChatMessageEntity>>): Promise<ChatMessageEntity> => {
    return this.entity
      .query(this.connection)
      .insert(data)
      .withGraphFetched('user')
      .execute();
  };
}
