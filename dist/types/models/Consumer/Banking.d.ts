import BaseModel, { BaseModelSchema } from "../Base/BaseModel";
import Consumer from "./Consumer";
export declare enum BankingType {
    CHECKING = "checking",
    SAVINGS = "savings"
}
export interface BankingSchema extends BaseModelSchema {
    consumer: Consumer;
    type: BankingType;
    bank: number;
    agency: number;
    agencyDigit: string;
    account: number;
    accountDigit: string;
}
export declare class Banking extends BaseModel implements BankingSchema {
    consumer: Consumer;
    type: BankingType;
    bank: number;
    agency: number;
    agencyDigit: string;
    account: number;
    accountDigit: string;
    constructor(data: Partial<BankingSchema>);
}
