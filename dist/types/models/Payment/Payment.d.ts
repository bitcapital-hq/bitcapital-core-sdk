import { BaseModel, BaseModelSchema, Transaction, WalletSchema, AssetSchema, Wallet, Asset } from "..";
export declare enum PaymentType {
    DEPOSIT = "deposit",
    WITHDRAWAL = "withdrawal",
    TRANSFER = "transfer"
}
export interface PaymentSchema extends BaseModelSchema {
    type: PaymentType;
    transaction: Transaction;
    amount: string;
    destination: WalletSchema;
    asset?: AssetSchema;
}
export declare class Payment extends BaseModel implements PaymentSchema {
    type: PaymentType;
    transaction: Transaction;
    amount: string;
    destination: Wallet;
    asset?: Asset;
    constructor(data: Partial<PaymentSchema>);
}
