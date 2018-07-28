import { Consumer } from ".";
import { BaseModel, BaseModelSchema } from "..";

export interface WalletSchema extends BaseModelSchema {
  address: string;
  consumer?: Consumer;
}

export default class Wallet extends BaseModel implements WalletSchema {
  address: string = undefined;
  consumer?: Consumer = undefined;

  constructor(data: Partial<WalletSchema>) {
    super(data);

    // Assign all props
    Object.getOwnPropertyNames(this).map(prop => (this[prop] = data[prop]));
  }
}
