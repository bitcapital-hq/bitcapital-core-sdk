export interface BoletoPaymentRequestSchema {
  userId: string;
  barcode: string;
  amount?: string;
  discount?: number;
  taxAmount?: number;
  description: string;
}
