import { Consumer, ConsumerSchema } from ".";
import { BaseModel, BaseModelSchema } from "..";
import { IsNotEmpty, IsOptional } from "class-validator";

export enum AddressType {
  HOME = "home",
  WORK = "work"
}

export interface AddressSchema extends BaseModelSchema {
  consumer?: ConsumerSchema;
  type: AddressType;
  country: string;
  geo: { x: number; y: number };
  city: string;
  code: string;
  state: string;
  street: string;
  complement?: string;
  number?: string;
  reference?: string;
}

export class Address extends BaseModel implements AddressSchema {
  consumer?: Consumer = undefined;

  @IsNotEmpty() type: AddressType = AddressType.HOME;
  @IsNotEmpty() country: string = undefined;
  @IsNotEmpty() state: string = undefined;
  @IsNotEmpty() city: string = undefined;
  @IsNotEmpty() code: string = undefined;
  @IsNotEmpty() street: string = undefined;
  @IsOptional() complement?: string = undefined;
  @IsOptional() number?: string = undefined;
  @IsOptional() reference?: string = undefined;

  geo: { x: number; y: number } = undefined;

  constructor(data: Partial<AddressSchema> = {}) {
    super(data);

    Object.assign(this, data);

    this.consumer = data.consumer && new Consumer(data.consumer);
  }
}
