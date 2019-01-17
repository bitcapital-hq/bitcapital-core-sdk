export interface BoletoPaymentRequestSchema {
  userId: string;
  barcode: string;
  amount?: number;
  discount?: number;
  taxAmount?: number;
  description: string;
}
