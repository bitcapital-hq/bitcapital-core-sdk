import { BaseModel, BaseModelSchema, Wallet } from "..";
import { IsOptional, IsNotEmpty } from "class-validator";

export interface AssetSchema extends BaseModelSchema {
  name?: string;
  code: string;
  wallet?: Wallet;
}

export default class Asset extends BaseModel implements AssetSchema {
  @IsNotEmpty() code: string = undefined;

  @IsOptional() name?: string = undefined;

  @IsOptional() wallet?: Wallet = undefined;

  constructor(data: Partial<AssetSchema>) {
    super(data);

    // Assign all props
    Object.getOwnPropertyNames(this).map(prop => (this[prop] = data[prop]));
  }
}
