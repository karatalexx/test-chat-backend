export class ValidationException extends Error {
  public custom_validation = true;
  public errors: Error[] = [];

  constructor(errors?: Error[]) {
    super();
    this.errors = errors;
  }
}
