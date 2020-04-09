import { BaseValidator } from '../../../base.validator';

export class AuthenticationRequestValidator extends BaseValidator {
  protected schema = {
    $async: true,
    $schema: 'http://json-schema.org/draft-07/schema',
    type: 'object',
    title: 'Authentication request',
    description: 'Authenticate user with email and password',
    additionalProperties: false,
    required: ['email', 'password'],
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string' }
    }
  };
}
