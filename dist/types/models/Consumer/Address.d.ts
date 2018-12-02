import { Consumer } from ".";
import { BaseModel, BaseModelSchema } from "..";
export declare enum AddressType {
    HOME = "home",
    WORK = "work"
}
export interface AddressSchema extends BaseModelSchema {
    type?: AddressType;
    consumer?: Consumer;
    consumerId: string;
    country: string;
    geo: {
        x: number;
        y: number;
    };
    city: string;
    code: string;
    state: string;
    street: string;
    complement: string;
    number: string;
    reference?: string;
}
export default class Address extends BaseModel implements AddressSchema {
    consumer?: Consumer;
    consumerId: string;
    type?: AddressType;
    reference?: string;
    country: string;
    state: string;
    city: string;
    code: string;
    street: string;
    complement: string;
    number: string;
    geo: {
        x: number;
        y: number;
    };
    constructor(data: Partial<AddressSchema>);
}
