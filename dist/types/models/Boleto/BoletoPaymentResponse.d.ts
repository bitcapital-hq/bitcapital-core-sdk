import { ValidationError } from "class-validator";
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
export declare class BoletoPaymentResponse implements BoletoPaymentResponseSchema {
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
    /**
     * Returns true if the model is valid or an array of validation errors if invalid
     *
     * @param {boolean} [toString] If toString is true, this will return a formatted error string
     */
    isValid(toString?: boolean): Promise<string | true | ValidationError[]>;
}
