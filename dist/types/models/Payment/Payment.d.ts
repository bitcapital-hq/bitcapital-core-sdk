import { BaseModel, BaseModelSchema, Transaction, WalletSchema, AssetSchema, Wallet, Asset } from "..";
import { TransactionSchema } from "../Transaction";
export declare enum PaymentType {
    DEPOSIT = "deposit",
    WITHDRAWAL = "withdrawal",
    TRANSFER = "transfer"
}
export interface PaymentSchema extends BaseModelSchema {
    type: PaymentType;
    amount: string;
    destination?: WalletSchema;
    transaction?: TransactionSchema;
    asset?: AssetSchema;
}
export declare class Payment extends BaseModel implements PaymentSchema {
    type: PaymentType;
    amount: string;
    transaction?: Transaction;
    destination?: Wallet;
    asset?: Asset;
    constructor(data?: Partial<PaymentSchema>);
}
