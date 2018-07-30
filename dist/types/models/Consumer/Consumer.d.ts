import { Address, Document, Phone, Wallet } from ".";
import { BaseModel, BaseModelSchema, User } from "..";
export declare enum ConsumerStatus {
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
    status: ConsumerStatus;
    user?: User;
    userId: string;
    documents?: Document[];
    phones?: Phone[];
    addresses?: Address[];
    wallets?: Wallet[];
    constructor(data: Partial<ConsumerSchema>);
}
