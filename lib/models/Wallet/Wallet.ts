import User from "../User/User";
import { WalletType } from "./WalletType";
import { BaseModel, BaseModelSchema } from "..";
import { StellarWalletData, BankingWalletData } from "./WalletData";
import { WalletBalance } from "./WalletBalance";
import { IsNotEmpty, IsEnum } from "class-validator";

export { WalletType, StellarWalletData, BankingWalletData, WalletBalance };

export interface WalletSchema extends BaseModelSchema {
  type: WalletType;
  data?: StellarWalletData | BankingWalletData;
  user?: User | string;
  balances?: WalletBalance[];
}

export default class Wallet extends BaseModel implements WalletSchema {
  @IsNotEmpty()
  @IsEnum(WalletType)
  type: WalletType = undefined;

  @IsNotEmpty() data: StellarWalletData | BankingWalletData = undefined;

  user?: User | string = undefined;
  balances?: WalletBalance[] = undefined;

  constructor(data: Partial<WalletSchema>) {
    super(data);

    // Assign all props
    Object.getOwnPropertyNames(this).map(prop => (this[prop] = data[prop]));
  }
}
