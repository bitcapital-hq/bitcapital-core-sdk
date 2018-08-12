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
    data: TransactionAdditionalData;
    type: TransactionType;
    source: Wallet;
    payments?: Payment[];
    constructor(data: Partial<TransactionSchema>);
}
