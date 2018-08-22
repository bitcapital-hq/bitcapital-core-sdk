import Recipient from "./Recipient";
export interface PaymentRequestSchema {
    source: string;
    recipients: Recipient[];
    asset?: string;
}
