import { BaseModel, BaseModelSchema, Wallet } from "..";
import { IsOptional, IsNotEmpty } from "class-validator";
import { WalletSchema } from "../Wallet/Wallet";
import Payment, { PaymentSchema } from "../Payment/Payment";

export interface AssetSchema extends BaseModelSchema {
  name?: string;
  code: string;
  issuer: WalletSchema;
  wallets?: WalletSchema[];
  payments?: PaymentSchema[];
}

export default class Asset extends BaseModel implements AssetSchema {
  @IsNotEmpty() code: string = undefined;

  @IsOptional() name?: string = undefined;

  issuer: Wallet = undefined;
  wallets?: Wallet[] = undefined;
  payments?: Payment[] = undefined;

  constructor(data: Partial<AssetSchema>) {
    super(data);

    Object.assign(this, data);

    this.issuer = data.issuer && new Wallet(data.issuer);
    this.wallets = data.wallets && data.wallets.map(wallet => new Wallet(wallet));
    this.payments = data.payments && data.payments.map(payments => new Payment(payments));
  }
}
