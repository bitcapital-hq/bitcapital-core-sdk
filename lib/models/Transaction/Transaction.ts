import { TransactionType } from "./TransactionType";
import { BaseModel, BaseModelSchema } from "..";
import Wallet from "../Wallet/Wallet";
import Payment from "../Payment/Payment";

export { TransactionType };

export interface TransactionAdditionalData {
  hash?: string;
  assetId?: string;
  assetCode?: string;
}

export interface TransactionSchema extends BaseModelSchema {
  data: TransactionAdditionalData;
  type: TransactionType;
  source: Wallet;
  payments?: Payment[];
}

export default class Transaction extends BaseModel implements TransactionSchema {
  data: TransactionAdditionalData = undefined;
  type: TransactionType = undefined;
  source: Wallet = undefined;
  payments?: Payment[] = undefined;

  constructor(data: Partial<TransactionSchema>) {
    super(data);

    // Assign all props
    Object.getOwnPropertyNames(this).map(prop => (this[prop] = data[prop]));
  }
}
