import BaseModel, { BaseModelSchema } from "../Base/BaseModel";
import { Consumer } from ".";

export interface PhoneSchema extends BaseModelSchema {
  consumer: Consumer;
  consumerId: string;
  code: number;
  number: string;
  verifiedAt?: Date;
}

export default class Phone extends BaseModel implements PhoneSchema {
  consumer: Consumer;
  consumerId: string;
  code: number;
  number: string;
  verifiedAt?: Date;

  constructor(data: Partial<PhoneSchema>) {
    super(data);

    // Assign all props
    Object.getOwnPropertyNames(this).map(prop => (this[prop] = data[prop]));
  }
}
