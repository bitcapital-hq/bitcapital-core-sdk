import User from "../User/User";
import { WalletType } from "./WalletType";
import { BaseModel, BaseModelSchema } from "..";
import { StellarWalletData, BankingWalletData } from "./WalletData";
import { WalletBalance } from "./WalletBalance";
export { WalletType, StellarWalletData, BankingWalletData, WalletBalance };
export interface WalletSchema extends BaseModelSchema {
    type: WalletType;
    data: StellarWalletData | BankingWalletData;
    user?: User | string;
    balances?: WalletBalance[];
}
export default class Wallet extends BaseModel implements WalletSchema {
    type: WalletType;
    data: StellarWalletData | BankingWalletData;
    user?: User | string;
    balances?: WalletBalance[];
    constructor(data: Partial<WalletSchema>);
}
