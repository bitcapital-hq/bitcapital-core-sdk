import { BaseModel, BaseModelSchema } from "..";
import Wallet from "../Wallet/Wallet";
import Transaction from "../Transaction/Transaction";
import Recipient from "./Recipient";
export interface PaymentSchema extends BaseModelSchema {
    source: Wallet | string;
    recipients: Recipient[];
    totalAmount: number;
    transaction?: Transaction;
}
export default class Payment extends BaseModel implements PaymentSchema {
    source: Wallet | string;
    transaction: Transaction;
    recipients: Recipient[];
    totalAmount: number;
    constructor(data: Partial<PaymentSchema>);
}
