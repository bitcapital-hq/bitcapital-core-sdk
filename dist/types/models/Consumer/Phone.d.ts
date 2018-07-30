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
    consumer?: Consumer;
    consumerId: string;
    code: number;
    number: string;
    verifiedAt?: Date;
    constructor(data: Partial<PhoneSchema>);
}
