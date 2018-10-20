import { ValidationError } from "class-validator";
export interface BaseModelSchema {
    id?: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}
export default class BaseModel {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    constructor(data: any);
    /**
     * Returns true if the model is valid or an array of validation errors if invalid
     *
     * @param {boolean} [toString] If toString is true, this will return a formatted error string
     */
    isValid(toString?: boolean): Promise<string | true | ValidationError[]>;
}
