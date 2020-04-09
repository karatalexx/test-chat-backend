import { MessagesHelper } from '../helpers/messages';

export class UserNotFoundException extends Error {
  protected key: string;

  constructor(key = 'email', message: string = MessagesHelper.USER_IS_NOT_FOUND) {
    super(message);
    this.key = key;
  }
}
