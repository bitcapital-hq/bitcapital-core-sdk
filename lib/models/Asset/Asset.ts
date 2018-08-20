import { BaseModel, BaseModelSchema, Wallet } from "..";

export interface AssetSchema extends BaseModelSchema {
  name?: string;
  code: string;
  wallet?: Wallet;
}

export default class Asset extends BaseModel implements AssetSchema {
  name?: string = undefined;
  code: string = undefined;
  wallet?: Wallet = undefined;

  constructor(data: Partial<AssetSchema>) {
    super(data);

    // Assign all props
    Object.getOwnPropertyNames(this).map(prop => (this[prop] = data[prop]));
  }
}
