import { BaseModel, BaseModelSchema } from "..";
import Wallet from "../Wallet/Wallet";
import { BankTransfer } from "./BankTransfer";
export interface BankTransferPaymentSchema extends BaseModelSchema {
    type: string;
    bitcapitalCoreId: string;
    transactionCode?: string;
    source: Wallet | string;
    amount: string;
    bankTransfer: BankTransfer;
}
export declare class BankTransferPayment extends BaseModel implements BankTransferPaymentSchema {
    source: Wallet | string;
    type: string;
    bitcapitalCoreId: string;
    transactionCode?: string;
    amount: string;
    bankTransfer: BankTransfer;
    constructor(data: Partial<BankTransferPaymentSchema>);
}
