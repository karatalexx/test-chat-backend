import { MessagesHelper } from '../helpers/messages';

export class UserWithEmailAlreadyExistException extends Error {
  protected key: string;

  constructor(key = 'email', message: string = MessagesHelper.USER_WITH_EMAIL_IS_ALREADY_EXIST) {
    super(message);
    this.key = key;
  }
}
