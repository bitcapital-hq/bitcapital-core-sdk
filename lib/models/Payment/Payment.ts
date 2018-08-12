import { BaseModel, BaseModelSchema } from "..";
import Wallet from "../Wallet/Wallet";
import Transaction from "../Transaction/Transaction";
import Recipient from "./Recipient";

export interface PaymentSchema extends BaseModelSchema {
  source: Wallet;
  transaction: Transaction;
  recipients: Recipient[];
}

export default class Payment extends BaseModel implements PaymentSchema {
  source: Wallet = undefined;
  transaction: Transaction = undefined;
  recipients: Recipient[] = undefined;

  constructor(data: Partial<PaymentSchema>) {
    super(data);

    // Assign all props
    Object.getOwnPropertyNames(this).map(prop => (this[prop] = data[prop]));
  }
}
