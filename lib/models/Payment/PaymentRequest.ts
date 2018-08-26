import { RecipientSchema } from "./Recipient";

export interface PaymentRequestSchema {
  source: string;
  recipients: RecipientSchema[];
  asset?: string;
}
