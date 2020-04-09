import { MessagesHelper } from '../helpers/messages';

export class TokenBelongsToUnreachableUserException extends Error {
  constructor(message: string = MessagesHelper.TOKEN_BELONGS_TO_UNREACHABLE_USER) {
    super(message);
  }
}
