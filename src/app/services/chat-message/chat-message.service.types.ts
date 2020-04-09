import { ModelObject } from 'objection';
import { ChatMessageEntity } from '../../entities/chat-message/chat-message.entity';

export interface IChatMessageService {
  store(data: Partial<ModelObject<ChatMessageEntity>>): Promise<ChatMessageEntity>;
}
