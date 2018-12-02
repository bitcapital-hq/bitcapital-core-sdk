import { Consumer } from ".";
import { BaseModel, BaseModelSchema } from "..";
import { IsNotEmpty, IsUUID } from "class-validator";

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
  address: string;
  complement: string;
  number: string;
}

export default class Address extends BaseModel implements AddressSchema {
  type?: AddressType = AddressType.HOME;
  consumer?: Consumer = undefined;
  @IsUUID() consumerId: string = undefined;

  @IsNotEmpty() country: string = undefined;
  @IsNotEmpty() city: string = undefined;
  @IsNotEmpty() code: string = undefined;
  @IsNotEmpty() address: string = undefined;
  @IsNotEmpty() complement: string = undefined;
  @IsNotEmpty() number: string = undefined;

  geo: { x: number; y: number } = undefined;

  constructor(data: Partial<AddressSchema>) {
    super(data);

    // Assign all props
    Object.getOwnPropertyNames(this).map(prop => (this[prop] = data[prop]));
  }
}
