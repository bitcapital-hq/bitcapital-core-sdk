import { Consumer } from ".";
import { BaseModel, BaseModelSchema } from "..";
import { IsUUID, IsNotEmpty, IsNumber, Max, IsNumberString, IsOptional, IsDate, MaxDate } from "class-validator";

export interface PhoneSchema extends BaseModelSchema {
  consumer?: Consumer;
  consumerId: string;
  code: number;
  number: string;
  verifiedAt?: Date | string;
}

export default class Phone extends BaseModel implements PhoneSchema {
  consumer?: Consumer = undefined;
  @IsUUID() consumerId: string = undefined;

  @IsNotEmpty()
  @IsNumber()
  @Max(999)
  code: number = undefined;

  @IsNotEmpty()
  @IsNumberString()
  number: string = undefined;

  @IsOptional()
  @IsDate()
  @MaxDate(new Date(new Date().getTime() + 5 * 60000)) // Now + 5min for server time differences
  verifiedAt?: Date = undefined;

  constructor(data: Partial<PhoneSchema>) {
    super(data);

    // Assign all props
    Object.getOwnPropertyNames(this).map(prop => (this[prop] = data[prop]));
    this.verifiedAt = data.verifiedAt instanceof Date ? data.verifiedAt : new Date(data.verifiedAt);
  }
}
