/**
 * Get validator class
 *
 * @param validatorName
 */
export function getValidator(validatorName: string): any {
  switch (validatorName) {
    // Sign up
    case 'sign-up.attempt':
      return new (require('./signup/signup-request.validator').SignUpRequestValidator)();

    //  Authentication
    case 'authentication.attempt':
      return new (require('./authentication/authentication-request.validator').AuthenticationRequestValidator)(); //  Authentication

    default:
      throw new Error('Validator is not exist');
  }
}
