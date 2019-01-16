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
}
