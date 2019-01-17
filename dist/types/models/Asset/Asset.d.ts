import { BaseModel, BaseModelSchema, Wallet, WalletSchema, PaymentSchema, Payment } from "..";
export interface AssetSchema extends BaseModelSchema {
    name?: string;
    code: string;
    issuer: WalletSchema;
    wallets?: WalletSchema[];
    payments?: PaymentSchema[];
}
export declare class Asset extends BaseModel implements AssetSchema {
    code: string;
    name?: string;
    issuer: Wallet;
    wallets?: Wallet[];
    payments?: Payment[];
    constructor(data?: Partial<AssetSchema>);
}
