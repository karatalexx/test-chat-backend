import { MessagesHelper } from '../helpers/messages';

export class UserCredentialsAreNotValidException extends Error {
  protected key: string;

  constructor(key = 'password', message: string = MessagesHelper.USER_CREDENTIALS_ARE_NOT_VALID) {
    super(message);
    this.key = key;
  }
}
