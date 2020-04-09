import { MessagesHelper } from '../helpers/messages';

export class UserWithUsernameAlreadyExistException extends Error {
  protected key: string;

  constructor(key = 'username', message: string = MessagesHelper.USER_WITH_USERNAME_IS_ALREADY_EXIST) {
    super(message);
    this.key = key;
  }
}
