import BaseModel, { BaseModelSchema } from "../Base/BaseModel";
import Consumer from "./Consumer";
import { IsNotEmpty } from "../../../node_modules/class-validator";

export enum BankingType {
  CHECKING = "checking",
  SAVINGS = "savings"
}

export interface BankingSchema extends BaseModelSchema {
  consumer: Consumer;
  type: BankingType;
  bank: number;
  agency: number;
  agencyDigit: string;
  account: number;
  accountDigit: string;
}

export class Banking extends BaseModel implements BankingSchema {
  @IsNotEmpty() consumer: Consumer = undefined;
  @IsNotEmpty() type: BankingType = BankingType.CHECKING;
  @IsNotEmpty() bank: number = undefined;
  @IsNotEmpty() agency: number = undefined;
  @IsNotEmpty() agencyDigit: string = undefined;
  @IsNotEmpty() account: number = undefined;
  @IsNotEmpty() accountDigit: string = undefined;

  constructor(data: Partial<BankingSchema>) {
    super(data);
    Object.assign(this, data);
  }
}
