import BaseModel, { BaseModelSchema } from "../Base/BaseModel";
import { Consumer } from ".";

export interface WalletSchema extends BaseModelSchema {
  address: string;
  consumer: Consumer;
}

export default class Wallet extends BaseModel implements WalletSchema {
  address: string;
  consumer: Consumer;

  constructor(data: Partial<WalletSchema>) {
    super(data);
    
    // Assign all props
    Object.getOwnPropertyNames(this).map(prop => this[prop] = data[prop]);
  }
}