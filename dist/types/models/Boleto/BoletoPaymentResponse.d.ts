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
    constructor(data: Partial<BoletoPaymentResponse>);
}
