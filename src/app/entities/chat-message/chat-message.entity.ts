import { Model, RelationMappings } from 'objection';
import { UserEntity } from '../user/user.entity';

export class ChatMessageEntity extends Model {
  public id: number;
  public user_id: number;
  public text: string;
  public created_at: string;

  // Table name
  public static tableName = 'chat_messages';

  //  Relations
  public static get relationMappings(): RelationMappings {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserEntity,
        join: {
          from: 'chat_messages.user_id',
          to: 'users.id'
        }
      }
    };
  }
}
