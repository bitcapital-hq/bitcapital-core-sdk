import { Transaction, TransactionStatus } from ".";
import { BaseModel } from "..";

export interface TransactionStateSchema {
  consumer: Transaction;
  status: TransactionStatus;
  additionalData?: any;
}

export class TransactionState extends BaseModel implements TransactionStateSchema {
  consumer: Transaction;
  status: TransactionStatus;
  additionalData?: any;

  constructor(data: Partial<TransactionStateSchema>) {
    super(data);

    Object.assign(this, data);

    this.consumer = data.consumer && new Transaction(data.consumer);
  }
}
