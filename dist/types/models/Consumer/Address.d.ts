import { Consumer } from ".";
import { BaseModel, BaseModelSchema } from "..";
export interface AddressSchema extends BaseModelSchema {
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
    constructor(data: Partial<AddressSchema>);
}
