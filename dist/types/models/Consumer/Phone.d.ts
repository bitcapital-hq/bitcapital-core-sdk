import { Consumer } from ".";
import { BaseModel, BaseModelSchema } from "..";
export declare enum PhoneType {
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
export declare class Phone extends BaseModel implements PhoneSchema {
    consumer?: Consumer;
    type: PhoneType;
    code: string;
    number: string;
    extension?: string;
    verifiedAt?: Date;
    constructor(data?: Partial<PhoneSchema>);
}
