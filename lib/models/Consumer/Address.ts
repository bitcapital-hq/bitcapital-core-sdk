import BaseModel, { BaseModelSchema } from "../Base/BaseModel";
import { Consumer } from ".";

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
  consumer?: Consumer;
  consumerId: string;
  country: string;
  geo: { x: number; y: number };
  city: string;
  code: string;
  address: string;
  complement: string;
  number: string;

  constructor(data: Partial<AddressSchema>) {
    super(data);

    // Assign all props
    Object.getOwnPropertyNames(this).map(prop => (this[prop] = data[prop]));
  }
}
