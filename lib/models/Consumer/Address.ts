import { Consumer } from ".";
import { BaseModel, BaseModelSchema } from "..";
import { IsNotEmpty, IsUUID, IsOptional } from "class-validator";

export enum AddressType {
  HOME = "home",
  WORK = "work"
}

export interface AddressSchema extends BaseModelSchema {
  type?: AddressType;
  consumer?: Consumer;
  consumerId: string;
  country: string;
  geo: { x: number; y: number };
  city: string;
  code: string;
  state: string;
  street: string;
  complement: string;
  number: string;
  reference?: string;
}

export default class Address extends BaseModel implements AddressSchema {
  consumer?: Consumer = undefined;
  @IsUUID() consumerId: string = undefined;

  type?: AddressType = AddressType.HOME;
  @IsOptional() reference?: string;
  @IsNotEmpty() country: string = undefined;
  @IsNotEmpty() state: string = undefined;
  @IsNotEmpty() city: string = undefined;
  @IsNotEmpty() code: string = undefined;
  @IsNotEmpty() street: string = undefined;
  @IsNotEmpty() complement: string = undefined;
  @IsNotEmpty() number: string = undefined;

  geo: { x: number; y: number } = undefined;

  constructor(data: Partial<AddressSchema>) {
    super(data);

    // Assign all props
    Object.getOwnPropertyNames(this).map(prop => (this[prop] = data[prop]));
  }
}
