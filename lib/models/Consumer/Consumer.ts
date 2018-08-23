import { Address, Document, Phone } from ".";
import { BaseModel, BaseModelSchema, User } from "..";
import { IsNotEmpty, IsEnum, IsUUID } from "class-validator";

export enum ConsumerStatus {
  PENDING_DOCUMENTS = "pending_documents",
  PENDING_SELFIE = "pending_selfie",
  PROCESSING = "processing",
  VERIFIED = "verified",
  SUSPENDED = "suspended",
  DELETED = "deleted",
  INVALID_DOCUMENTS = "invalid_documennts",
  INVALID_SELFIE = "invalid_selfie",
  MANUAL_VERIFICATION = "manual_verification"
}

export interface ConsumerSchema extends BaseModelSchema {
  status: ConsumerStatus;
  user?: User;
  userId: string;
  documents?: Document[];
  phones?: Phone[];
  addresses?: Address[];
}

export default class Consumer extends BaseModel implements ConsumerSchema {
  user?: User = undefined;
  @IsUUID() userId: string = undefined;

  @IsNotEmpty()
  @IsEnum(ConsumerStatus)
  status: ConsumerStatus = undefined;

  documents?: Document[] = undefined;
  phones?: Phone[] = undefined;
  addresses?: Address[] = undefined;

  constructor(data: Partial<ConsumerSchema>) {
    super(data);
    // Assign all props
    Object.getOwnPropertyNames(this).map(prop => (this[prop] = data[prop]));
  }
}
