import { BaseModel, BaseModelSchema, UserSchema, AssetSchema, TransactionSchema, PaymentSchema, User, Asset, Transaction, Payment } from "..";
import { StellarWalletData, CardsWalletData, WalletBalance } from ".";
export declare enum WalletStatus {
    PENDING = "pending",
    REGISTERED = "registered",
    READY = "ready",
    FAILED = "failed"
}
export declare enum WalletProvider {
    CDT_CARDS = "cards",
    NONE = "none"
}
export interface WalletSchema extends BaseModelSchema {
    status: WalletStatus;
    provider: WalletProvider;
    stellar: StellarWalletData;
    additionalData?: CardsWalletData;
    balances?: WalletBalance[];
    user?: UserSchema;
    issuedAssets?: AssetSchema[];
    assets?: AssetSchema[];
    transactions?: TransactionSchema[];
    received?: PaymentSchema[];
}
export declare class Wallet extends BaseModel implements WalletSchema {
    status: WalletStatus;
    provider: WalletProvider;
    stellar: StellarWalletData;
    additionalData?: CardsWalletData;
    balances?: WalletBalance[];
    user?: User;
    issuedAssets?: Asset[];
    assets?: Asset[];
    transactions?: Transaction[];
    received?: Payment[];
    constructor(data?: Partial<WalletSchema>);
}
