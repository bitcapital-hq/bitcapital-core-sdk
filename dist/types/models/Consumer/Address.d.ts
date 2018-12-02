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
    address: string;
    complement: string;
    number: string;
}
export default class Address extends BaseModel implements AddressSchema {
    type?: AddressType;
    consumer?: Consumer;
    consumerId: string;
    country: string;
    city: string;
    code: string;
    address: string;
    complement: string;
    number: string;
    geo: {
        x: number;
        y: number;
    };
    constructor(data: Partial<AddressSchema>);
}
