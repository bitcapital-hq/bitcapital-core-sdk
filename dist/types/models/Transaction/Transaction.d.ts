import { TransactionState, TransactionStateSchema } from ".";
import { BaseModel, BaseModelSchema, WalletSchema, PaymentSchema, UserSchema, Wallet, User, Payment } from "..";
export declare enum TransactionType {
    CREATE_ACCOUNT = "create_account",
    CHANGE_TRUST = "change_trust",
    PAYMENT = "payment"
}
export interface TransactionAdditionalData {
    hash?: string;
    asset_id?: string;
    wallet_id?: string;
    asset_code?: string;
    conductorType?: "boleto" | "teddoc";
}
export interface TransactionSchema extends BaseModelSchema {
    type: TransactionType;
    source: WalletSchema;
    payments?: PaymentSchema[];
    states?: TransactionStateSchema[];
    createdBy?: UserSchema;
    additionalData?: TransactionAdditionalData;
}
export declare class Transaction extends BaseModel implements TransactionSchema {
    type: TransactionType;
    source: Wallet;
    createdBy?: User;
    payments?: Payment[];
    states?: TransactionState[];
    additionalData?: TransactionAdditionalData;
    constructor(data: Partial<TransactionSchema>);
}
