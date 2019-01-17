import { IsNotEmpty, validate, ValidationError } from "class-validator";

export interface BoletoPaymentResponseSchema {
  paymentId: number;
  accountId: number;
  status: string;
  description: string;
  barcode: string;
  expiresAt: Date;
  recipientName: string;
  discount: number;
  taxAmount: number;
  amount: number;
}

export class BoletoPaymentResponse implements BoletoPaymentResponseSchema {
  @IsNotEmpty() paymentId: number = undefined;
  @IsNotEmpty() accountId: number = undefined;
  @IsNotEmpty() status: string = undefined;
  @IsNotEmpty() description: string = undefined;
  @IsNotEmpty() barcode: string = undefined;
  @IsNotEmpty() expiresAt: Date = undefined;
  @IsNotEmpty() recipientName: string = undefined;
  @IsNotEmpty() discount: number = undefined;
  @IsNotEmpty() taxAmount: number = undefined;
  @IsNotEmpty() amount: number = undefined;

  constructor(data: Partial<BoletoPaymentResponse>) {
    Object.assign(this, data);
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
