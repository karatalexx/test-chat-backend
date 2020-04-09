import Validator, { Ajv } from 'ajv';
import AjvErrors from 'ajv-errors';
import AjvKeywords from 'ajv-keywords';

export class BaseValidator {
  /**
   * Validator instance
   */
  protected validator!: Ajv;

  /**
   * Validation schema
   */
  protected schema!: object | boolean;

  /**
   * The data under validation.
   */
  protected data: any = {};

  /**
   * The data after validation.
   */
  protected validatedData: any;

  /**
   * Additional data
   */
  protected payload: any = {};

  constructor() {
    this.validator = new Validator({ allErrors: true, jsonPointers: true, $data: true });
  }

  /**
   * Prepare  data before validation
   */
  protected async prepareData(): Promise<any> {}

  /**
   * Attempt to validate
   *
   * @param data
   * @param payload
   */
  public async attempt(data: any, payload: any = {}): Promise<any> {
    // Run before validation hook
    await this.beforeValidation();

    // Set validated data and payload
    this.setData(data);
    this.setPayload(payload);

    // Prepare validated data
    await this.prepareData();

    // Set keywords for schema
    this.setKeywords();

    // Set validation errors
    AjvErrors(this.validator);
    AjvKeywords(this.validator);

    // Run the validator's rules against its data.
    this.validatedData = await this.validator.compile(this.schema)(data);

    // Run after validation hook
    await this.afterValidation();

    return {
      data: this.validatedData,
      payload: this.payload
    };
  }

  /**
   * Set keywords for schema
   */
  protected setKeywords(): void {}

  /**
   * Set validated data
   *
   * @param data
   */
  protected setData(data: any): void {
    this.data = data;
  }

  /**
   * Set payload
   *
   * @param payload
   */
  protected setPayload(payload: any): void {
    this.payload = payload;
  }

  /**
   * Before validation hook
   */
  protected async beforeValidation(): Promise<void> {}

  /**
   * After validation hook
   */
  protected async afterValidation(): Promise<void> {}
}
