import { MessagesHelper } from '../helpers/messages';

export class UnauthorizedException extends Error {
  constructor(message: string = MessagesHelper.UNAUTHORIZED) {
    super(message);
  }
}
