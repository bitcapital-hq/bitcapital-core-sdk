import { IsDate, IsNotEmpty, IsNumberString, IsOptional, MaxDate } from "class-validator";
import { Consumer } from ".";
import { BaseModel, BaseModelSchema } from "..";

export enum PhoneType {
  HOME = "home",
  WORK = "work",
  MOBILE = "mobile"
}

export interface PhoneSchema extends BaseModelSchema {
  consumer?: Consumer;
  code: string;
  number: string;
  extension?: string;
  verifiedAt?: Date;
}

export class Phone extends BaseModel implements PhoneSchema {
  consumer?: Consumer = undefined;

  @IsOptional() type: PhoneType = PhoneType.MOBILE;

  @IsNotEmpty()
  @IsNumberString()
  code: string = undefined;

  @IsNotEmpty()
  @IsNumberString()
  number: string = undefined;

  @IsOptional() extension?: string;

  @IsOptional()
  @IsDate()
  @MaxDate(new Date(new Date().getTime() + 5 * 60000)) // Now + 5min for server time differences
  verifiedAt?: Date = undefined;

  constructor(data: Partial<PhoneSchema> = {}) {
    super(data);

    Object.assign(this, data);

    this.verifiedAt = data.verifiedAt && new Date(data.verifiedAt);
    this.consumer = data.consumer && new Consumer(data.consumer);
  }
}
