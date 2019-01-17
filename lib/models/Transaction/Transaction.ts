import { TransactionState, TransactionStateSchema } from ".";
import { BaseModel, BaseModelSchema, WalletSchema, PaymentSchema, UserSchema, Wallet, User, Payment } from "..";
import { IsNotEmpty, IsEnum } from "class-validator";

export enum TransactionType {
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

export class Transaction extends BaseModel implements TransactionSchema {
  @IsNotEmpty()
  @IsEnum(TransactionType)
  type: TransactionType = undefined;

  source: Wallet = undefined;
  createdBy?: User = undefined;
  payments?: Payment[] = undefined;
  states?: TransactionState[] = undefined;
  additionalData?: TransactionAdditionalData = undefined;

  constructor(data: Partial<TransactionSchema> = {}) {
    super(data);

    Object.assign(this, data);

    this.source = data.source && new Wallet(data.source);
    this.createdBy = data.createdBy && new User(data.createdBy);
    this.payments = data.payments && data.payments.map(payment => new Payment(payment));
    this.states = data.states && data.states.map(state => new TransactionState(state));
  }
}
