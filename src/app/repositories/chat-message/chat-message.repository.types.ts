import { ChatMessageEntity } from '../../entities/chat-message/chat-message.entity';

export interface IChatMessageRepository {
  findAll(): Promise<ChatMessageEntity[]>;
  findById(id: number): Promise<ChatMessageEntity | undefined>;
}
