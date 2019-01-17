import { RecipientSchema } from "./Recipient";

export interface WithdrawalRequestSchema {
  bankingId: string;
  amount: number;
  description: string;
}

export interface PaymentRequestSchema {
  source: string;
  recipients: RecipientSchema[];
  asset?: string;
}
