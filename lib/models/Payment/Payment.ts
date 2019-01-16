import { BaseModel, BaseModelSchema } from "..";
import Wallet, { WalletSchema } from "../Wallet/Wallet";
import Transaction from "../Transaction/Transaction";
import Asset, { AssetSchema } from "../Asset/Asset";

export enum PaymentType {
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

export default class Payment extends BaseModel implements PaymentSchema {
  type: PaymentType;
  transaction: Transaction;
  amount: string;
  destination: Wallet;
  asset?: Asset;

  constructor(data: Partial<PaymentSchema>) {
    super(data);

    Object.assign(this, data);

    this.transaction = data.transaction && new Transaction(data.transaction);
    this.destination = data.destination && new Wallet(data.destination);
    this.asset = data.asset && new Asset(data.asset);
  }
}
