import { Consumer } from ".";
import { BaseModel, BaseModelSchema } from "..";

export interface AddressSchema extends BaseModelSchema {
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
  consumer?: Consumer = undefined;
  consumerId: string = undefined;
  country: string = undefined;
  geo: { x: number; y: number } = undefined;
  city: string = undefined;
  code: string = undefined;
  address: string = undefined;
  complement: string = undefined;
  number: string = undefined;

  constructor(data: Partial<AddressSchema>) {
    super(data);

    // Assign all props
    Object.getOwnPropertyNames(this).map(prop => (this[prop] = data[prop]));
  }
}
