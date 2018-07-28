import { Address, Document, Phone, Wallet } from ".";
import { BaseModel, BaseModelSchema, User } from "..";

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
  wallets?: Wallet[];
}

export default class Consumer extends BaseModel implements ConsumerSchema {
  status: ConsumerStatus = undefined;
  user?: User = undefined;
  userId: string = undefined;
  documents?: Document[] = undefined;
  phones?: Phone[] = undefined;
  addresses?: Address[] = undefined;
  wallets?: Wallet[] = undefined;
  constructor(data: Partial<ConsumerSchema>) {
    super(data);

    // Assign all props
    Object.getOwnPropertyNames(this).map(prop => (this[prop] = data[prop]));
  }
}
