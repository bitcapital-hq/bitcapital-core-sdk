export interface PaymentRequest {
    source: string;
    recipients: {
        destination: string;
        amount: string;
    };
    asset?: string;
}
