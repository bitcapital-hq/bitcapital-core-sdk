import BaseModel, { BaseModelSchema } from "../Base/BaseModel";
export interface BoletoPaymentResponseSchema extends BaseModelSchema {
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
export declare class BoletoPaymentResponse extends BaseModel implements BoletoPaymentResponseSchema {
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
