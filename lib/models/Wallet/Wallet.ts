import {
  BaseModel,
  BaseModelSchema,
  UserSchema,
  AssetSchema,
  TransactionSchema,
  PaymentSchema,
  User,
  Asset,
  Transaction,
  Payment
} from "..";
import { StellarWalletData, CardsWalletData, WalletBalance } from ".";
import { IsNotEmpty, IsEnum } from "class-validator";

export enum WalletStatus {
  PENDING = "pending",
  REGISTERED = "registered",
  READY = "ready",
  FAILED = "failed"
}

export enum WalletProvider {
  CDT_CARDS = "cards",
  NONE = "none"
}

export interface WalletSchema extends BaseModelSchema {
  status: WalletStatus;
  provider: WalletProvider;
  stellar: StellarWalletData;
  additionalData?: CardsWalletData;
  balances?: WalletBalance[];
  user: UserSchema;
  issuedAssets: AssetSchema[];
  assets: AssetSchema[];
  transactions: TransactionSchema[];
  received: PaymentSchema[];
}

export class Wallet extends BaseModel implements WalletSchema {
  @IsNotEmpty()
  @IsEnum(WalletStatus)
  status: WalletStatus;

  @IsNotEmpty()
  @IsEnum(WalletProvider)
  provider: WalletProvider;

  stellar: StellarWalletData;
  additionalData?: CardsWalletData;
  balances?: WalletBalance[];
  user: User;
  issuedAssets: Asset[];
  assets: Asset[];
  transactions: Transaction[];
  received: Payment[];

  constructor(data: Partial<WalletSchema>) {
    super(data);

    Object.assign(this, data);

    this.user = data.user && new User(data.user);
    this.issuedAssets = data.issuedAssets && data.issuedAssets.map(issuedAssets => new Asset(issuedAssets));
    this.assets = data.assets && data.assets.map(asset => new Asset(asset));
    this.transactions = data.transactions && data.transactions.map(transaction => new Transaction(transaction));
    this.received = data.received && data.received.map(received => new Payment(received));
  }
}
