import User from "../User/User";
import { WalletType } from "./WalletType";
import { BaseModel, BaseModelSchema } from "..";
import { StellarWalletData, BankingWalletData } from "./WalletData";
export { WalletType, StellarWalletData, BankingWalletData };
export interface WalletSchema extends BaseModelSchema {
    type: WalletType;
    data: StellarWalletData | BankingWalletData;
    user?: User | string;
}
export default class Wallet extends BaseModel implements WalletSchema {
    type: WalletType;
    data: StellarWalletData | BankingWalletData;
    user?: User | string;
    constructor(data: Partial<WalletSchema>);
}
