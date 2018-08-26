import { Consumer } from ".";
import { BaseModel, BaseModelSchema } from "..";
export declare enum DocumentType {
    BRL_IDENTITY = "brl_identity",
    BRL_INDIVIDUAL_REG = "brl_individual_reg",
    BRL_ADDRESS_STATEMENT = "brl_address_statement"
}
export interface DocumentSchema extends BaseModelSchema {
    consumer?: Consumer;
    consumerId: string;
    type: DocumentType;
    number?: string;
    front?: string;
    back?: string;
    selfie?: string;
    verifiedAt?: Date | string;
}
export default class Document extends BaseModel implements DocumentSchema {
    consumer?: Consumer;
    consumerId: string;
    type: DocumentType;
    number?: string;
    front?: string;
    back?: string;
    selfie?: string;
    verifiedAt?: Date;
    constructor(data: Partial<DocumentSchema>);
}
