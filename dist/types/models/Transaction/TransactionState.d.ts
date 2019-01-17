import { Transaction, TransactionStatus } from ".";
import { BaseModel } from "..";
export interface TransactionStateSchema {
    consumer: Transaction;
    status: TransactionStatus;
    additionalData?: any;
}
export declare class TransactionState extends BaseModel implements TransactionStateSchema {
    consumer: Transaction;
    status: TransactionStatus;
    additionalData?: any;
    constructor(data?: Partial<TransactionStateSchema>);
}
