import { Address, AddressSchema, Document, DocumentSchema, Phone, PhoneSchema, ConsumerState, ConsumerStateSchema } from ".";
import { BaseModel, BaseModelSchema, User, UserSchema } from "..";
export interface ConsumerSchema extends BaseModelSchema {
    user?: UserSchema;
    documents?: DocumentSchema[];
    phones?: PhoneSchema[];
    addresses?: AddressSchema[];
    taxId: string;
    states?: ConsumerStateSchema[];
}
export declare class Consumer extends BaseModel implements ConsumerSchema {
    user?: User;
    taxId: string;
    addresses: Address[];
    documents?: Document[];
    phones: Phone[];
    states?: ConsumerState[];
    constructor(data?: Partial<ConsumerSchema>);
}
