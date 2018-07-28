import { Consumer } from ".";
import { BaseModel, BaseModelSchema } from "..";

export interface PhoneSchema extends BaseModelSchema {
  consumer?: Consumer;
  consumerId: string;
  code: number;
  number: string;
  verifiedAt?: Date;
}

export default class Phone extends BaseModel implements PhoneSchema {
  consumer?: Consumer = undefined;
  consumerId: string = undefined;
  code: number = undefined;
  number: string = undefined;
  verifiedAt?: Date = undefined;

  constructor(data: Partial<PhoneSchema>) {
    super(data);

    // Assign all props
    Object.getOwnPropertyNames(this).map(prop => (this[prop] = data[prop]));
  }
}
