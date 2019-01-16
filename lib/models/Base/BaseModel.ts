import { IsOptional, IsUUID, validate, ValidationError } from "class-validator";

export interface BaseModelSchema {
  id?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export class BaseModel {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional() createdAt?: Date;

  @IsOptional() updatedAt?: Date;

  constructor(data: any) {
    this.id = data.id;

    if (data.createdAt) {
      this.createdAt = new Date(data.createdAt);
    }
    if (data.updatedAt) {
      this.updatedAt = new Date(data.createdAt);
    }
  }

  /**
   * Returns true if the model is valid or an array of validation errors if invalid
   *
   * @param {boolean} [toString] If toString is true, this will return a formatted error string
   */
  public async isValid(toString?: boolean): Promise<string | true | ValidationError[]> {
    const errors = await validate(this);

    if (errors.length === 0) {
      return true;
    }

    if (toString) {
      return errors.map(error => error.toString(true)).join("; ");
    }

    return errors;
  }
}
