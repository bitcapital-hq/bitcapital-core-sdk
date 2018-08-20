import { BaseModel, BaseModelSchema } from "..";
import Wallet from "../Wallet/Wallet";
import Transaction from "../Transaction/Transaction";
import Recipient from "./Recipient";
export interface PaymentSchema extends BaseModelSchema {
    source: Wallet | string;
    recipients: Recipient[];
    transaction?: Transaction;
}
export default class Payment extends BaseModel implements PaymentSchema {
    source: Wallet | string;
    transaction: Transaction;
    recipients: Recipient[];
    constructor(data: Partial<PaymentSchema>);
}
