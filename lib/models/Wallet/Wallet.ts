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
  type: WalletType = undefined;
  data: StellarWalletData | BankingWalletData = undefined;
  user?: User | string = undefined;
  balances?: WalletBalance[] = undefined;

  constructor(data: Partial<WalletSchema>) {
    super(data);

    // Assign all props
    Object.getOwnPropertyNames(this).map(prop => (this[prop] = data[prop]));
  }
}
