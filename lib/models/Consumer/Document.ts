import { Consumer } from ".";
import { BaseModel, BaseModelSchema } from "..";

export enum DocumentType {
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
  verifiedAt?: Date;
}

export default class Document extends BaseModel implements DocumentSchema {
  consumer?: Consumer = undefined;
  consumerId: string = undefined;
  type: DocumentType = undefined;
  number?: string = undefined;
  front?: string = undefined;
  back?: string = undefined;
  selfie?: string = undefined;
  verifiedAt?: Date = undefined;

  constructor(data: Partial<DocumentSchema>) {
    super(data);

    // Assign all props
    Object.getOwnPropertyNames(this).map(prop => (this[prop] = data[prop]));
  }
}
