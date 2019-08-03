import { PaymentType } from "bitcapital-common";

export interface AssetEmitRequestSchema {
  id?: string;
  paymentType?: PaymentType;
  amount: string;
  destination?: string;
  additionalData?: any;
}
