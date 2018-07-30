import { Consumer } from ".";
import { BaseModel, BaseModelSchema } from "..";
export interface WalletSchema extends BaseModelSchema {
    address: string;
    consumer?: Consumer;
}
export default class Wallet extends BaseModel implements WalletSchema {
    address: string;
    consumer?: Consumer;
    constructor(data: Partial<WalletSchema>);
}
