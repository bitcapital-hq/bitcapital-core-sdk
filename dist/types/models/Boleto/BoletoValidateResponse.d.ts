export interface BoletoValidateResponseSchema {
    paid: boolean;
    boletoInfo: BoletoInfo;
    paymentInfo: PaymentInfo;
}
export interface BoletoInfo {
    description: string;
    amount: number;
    expiresAt: Date;
    hasExpirationDate: boolean;
    barcodeNumber: string;
}
export interface PaymentInfo {
    contractId: string;
    idNumber: string;
    traders: TradersInfo;
    expiresAt: Date;
    totalAmount: number;
    amountDetails: PaymentAmountDetails;
    acceptPartialAmount: PartialAmountDetails;
    barcode: string;
    digitableLine: string;
    paymentDeadline: Date;
    validDate: boolean;
    nextBusinessDay: string;
}
export interface TradersInfo {
    recipient: string;
    recipientDocument: string;
    payerName: string;
    payerDocument: string;
}
export interface PartialAmountDetails {
    code: number;
    description: string;
}
export interface PaymentAmountDetails {
    interestAmount: number;
    discount: number;
    fineAmount: number;
    totalAmount: number;
    paymentAmountUpdated: number;
    calculationDate: Date;
}
export default class BoletoValidateResponse implements BoletoValidateResponseSchema {
    paid: boolean;
    boletoInfo: BoletoInfo;
    paymentInfo: PaymentInfo;
    constructor(data: Partial<BoletoValidateResponseSchema>);
}
