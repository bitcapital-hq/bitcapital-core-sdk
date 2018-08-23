import { BaseModel, BaseModelSchema } from "..";
import Wallet from "../Wallet/Wallet";
import { IsNotEmpty, IsNumberString, IsUUID } from "class-validator";

export interface RecipientSchema extends BaseModelSchema {
  amount: string;
  destination: Wallet | string;
}

export default class Recipient extends BaseModel implements RecipientSchema {
  @IsNotEmpty()
  @IsNumberString()
  amount: string = undefined;

  @IsUUID() destination: Wallet | string = undefined;

  constructor(data: Partial<RecipientSchema>) {
    super(data);

    // Assign all props
    Object.getOwnPropertyNames(this).map(prop => (this[prop] = data[prop]));
  }
}
