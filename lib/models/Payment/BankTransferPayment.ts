import { BaseModel, BaseModelSchema } from "..";
import Wallet from "../Wallet/Wallet";
import { BankTransfer } from "./BankTransfer";
import { IsNotEmpty, IsOptional } from "../../../node_modules/class-validator";

export interface BankTransferPaymentSchema extends BaseModelSchema {
  type: string;
  bitcapitalCoreId: string;
  transactionCode?: string;
  source: Wallet | string;
  amount: string;
  bankTransfer: BankTransfer;
}

export class BankTransferPayment extends BaseModel implements BankTransferPaymentSchema {
  @IsNotEmpty() source: Wallet | string = undefined;
  @IsNotEmpty() type: string = undefined;
  @IsNotEmpty() bitcapitalCoreId: string = undefined;
  @IsOptional() transactionCode?: string = undefined;
  @IsNotEmpty() amount: string = undefined;
  @IsNotEmpty() bankTransfer: BankTransfer = undefined;

  constructor(data: Partial<BankTransferPaymentSchema>) {
    super(data);
    Object.assign(this, data);
  }
}
