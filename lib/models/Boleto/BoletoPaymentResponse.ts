import { IsNotEmpty } from "../../../node_modules/class-validator";

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

export default class BoletoPaymentResponse implements BoletoPaymentResponseSchema {
  @IsNotEmpty() paymentId: number;
  @IsNotEmpty() accountId: number;
  @IsNotEmpty() status: string;
  @IsNotEmpty() description: string;
  @IsNotEmpty() barcode: string;
  @IsNotEmpty() expiresAt: Date;
  @IsNotEmpty() recipientName: string;
  @IsNotEmpty() discount: number;
  @IsNotEmpty() taxAmount: number;
  @IsNotEmpty() amount: number;

  constructor(data: Partial<BoletoPaymentResponse>) {
    Object.getOwnPropertyNames(this).map(prop => (this[prop] = data[prop]));
  }
}
