import { BaseValidator } from '../../../base.validator';

export class SignUpRequestValidator extends BaseValidator {
  protected schema = {
    $async: true,
    $schema: 'http://json-schema.org/draft-07/schema',
    type: 'object',
    title: 'Sign up request',
    description: 'Create new user with jwt token',
    additionalProperties: false,
    required: ['email', 'password', 'username'],
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string' },
      username: { type: 'string' }
    }
  };
}
