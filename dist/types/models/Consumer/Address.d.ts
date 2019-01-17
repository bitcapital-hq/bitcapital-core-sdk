import { Consumer, ConsumerSchema } from ".";
import { BaseModel, BaseModelSchema } from "..";
export declare enum AddressType {
    HOME = "home",
    WORK = "work"
}
export interface AddressSchema extends BaseModelSchema {
    consumer?: ConsumerSchema;
    type: AddressType;
    country: string;
    geo: {
        x: number;
        y: number;
    };
    city: string;
    code: string;
    state: string;
    street: string;
    complement?: string;
    number?: string;
    reference?: string;
}
export declare class Address extends BaseModel implements AddressSchema {
    consumer?: Consumer;
    type: AddressType;
    country: string;
    state: string;
    city: string;
    code: string;
    street: string;
    complement?: string;
    number?: string;
    reference?: string;
    geo: {
        x: number;
        y: number;
    };
    constructor(data?: Partial<AddressSchema>);
}
