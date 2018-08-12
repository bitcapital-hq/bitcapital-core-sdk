import { BaseModel, BaseModelSchema } from "..";
import Wallet from "../Wallet/Wallet";
export interface RecipientSchema extends BaseModelSchema {
    amount: string;
    destination: Wallet;
}
export default class Recipient extends BaseModel implements RecipientSchema {
    amount: string;
    destination: Wallet;
    constructor(data: Partial<RecipientSchema>);
}
