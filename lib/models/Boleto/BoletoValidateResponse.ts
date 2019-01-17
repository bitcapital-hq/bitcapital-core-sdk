import { IsNotEmpty, validate, ValidationError } from "../../../node_modules/class-validator";

export interface BoletoInfoSchema {
  description: string;
  amount: number;
  expiresAt: Date;
  hasExpirationDate: boolean;
  barcodeNumber: string;
}

export class BoletoInfo implements BoletoInfoSchema {
  @IsNotEmpty() description: string = undefined;
  @IsNotEmpty() amount: number = undefined;
  @IsNotEmpty() expiresAt: Date = undefined;
  @IsNotEmpty() hasExpirationDate: boolean = undefined;
  @IsNotEmpty() barcodeNumber: string = undefined;

  constructor(data: Partial<BoletoInfoSchema>) {
    Object.assign(this, data);
  }
}

export interface TradersInfoSchema {
  recipient: string;
  recipientDocument: string;
  payerName: string;
  payerDocument: string;
}

export class TradersInfo implements TradersInfoSchema {
  @IsNotEmpty() recipient: string = undefined;
  @IsNotEmpty() recipientDocument: string = undefined;
  @IsNotEmpty() payerName: string = undefined;
  @IsNotEmpty() payerDocument: string = undefined;

  constructor(data: Partial<TradersInfoSchema>) {
    Object.assign(this, data);
  }
}

export interface PartialAmountDetailsSchema {
  code: number;
  description: string;
}

export class PartialAmountDetails implements PartialAmountDetailsSchema {
  @IsNotEmpty() code: number = undefined;
  @IsNotEmpty() description: string = undefined;

  constructor(data: Partial<PartialAmountDetailsSchema>) {
    Object.assign(this, data);
  }
}

export interface PaymentAmountDetailsSchema {
  interestAmount: number;
  discount: number;
  fineAmount: number;
  totalAmount: number;
  paymentAmountUpdated: number;
  calculationDate: Date;
}

export class PaymentAmountDetails implements PaymentAmountDetailsSchema {
  @IsNotEmpty() interestAmount: number = undefined;
  @IsNotEmpty() discount: number = undefined;
  @IsNotEmpty() fineAmount: number = undefined;
  @IsNotEmpty() totalAmount: number = undefined;
  @IsNotEmpty() paymentAmountUpdated: number = undefined;
  @IsNotEmpty() calculationDate: Date = undefined;

  constructor(data: Partial<PaymentAmountDetailsSchema>) {
    Object.assign(this, data);
  }
}

export interface PaymentInfoSchema {
  contractId: string;
  idNumber: string;
  traders: TradersInfo;
  expiresAt: Date;
  totalAmount: number;
  amountDetails: PaymentAmountDetails;
  acceptPartialAmount: PartialAmountDetails;
  barcode: string;
  digitableLine: string;
  paymentDeadline: Date;
  validDate: boolean;
  nextBusinessDay: string;
}

export class PaymentInfo implements PaymentInfoSchema {
  @IsNotEmpty() contractId: string = undefined;
  @IsNotEmpty() idNumber: string = undefined;
  @IsNotEmpty() traders: TradersInfo = undefined;
  @IsNotEmpty() expiresAt: Date = undefined;
  @IsNotEmpty() totalAmount: number = undefined;
  @IsNotEmpty() amountDetails: PaymentAmountDetails = undefined;
  @IsNotEmpty() acceptPartialAmount: PartialAmountDetails = undefined;
  @IsNotEmpty() barcode: string = undefined;
  @IsNotEmpty() digitableLine: string = undefined;
  @IsNotEmpty() paymentDeadline: Date = undefined;
  @IsNotEmpty() validDate: boolean = undefined;
  @IsNotEmpty() nextBusinessDay: string = undefined;

  constructor(data: Partial<PaymentInfoSchema>) {
    Object.assign(this, data);
  }
}

export interface BoletoValidateResponseSchema {
  paid: boolean;
  boletoInfo: BoletoInfo;
  paymentInfo: PaymentInfo;
}

export class BoletoValidateResponse implements BoletoValidateResponseSchema {
  @IsNotEmpty() paid: boolean = undefined;
  @IsNotEmpty() boletoInfo: BoletoInfo = undefined;
  @IsNotEmpty() paymentInfo: PaymentInfo = undefined;

  constructor(data: Partial<BoletoValidateResponseSchema>) {
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
