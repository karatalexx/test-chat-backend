import { MessagesHelper } from '../helpers/messages';

export class UserAlreadyExistException extends Error {
  protected key: string;

  constructor(key?: string, message: string = MessagesHelper.USER_IS_ALREADY_EXIST) {
    super(message);
    this.key = key;
  }
}
