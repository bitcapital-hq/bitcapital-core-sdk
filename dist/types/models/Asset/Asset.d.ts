import { BaseModel, BaseModelSchema, Wallet } from "..";
export interface AssetSchema extends BaseModelSchema {
    name?: string;
    code: string;
    wallet?: Wallet;
}
export default class Asset extends BaseModel implements AssetSchema {
    name?: string;
    code: string;
    wallet?: Wallet;
    constructor(data: Partial<AssetSchema>);
}
