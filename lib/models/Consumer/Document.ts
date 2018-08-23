import { Consumer } from ".";
import { BaseModel, BaseModelSchema } from "..";
import { IsUUID, IsNotEmpty, IsEnum, IsOptional, IsBase64, IsDate, MaxDate } from "class-validator";

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
  @IsUUID() consumerId: string = undefined;

  @IsNotEmpty()
  @IsEnum(DocumentType)
  type: DocumentType = undefined;

  @IsOptional()
  @IsNotEmpty()
  number?: string = undefined;

  @IsOptional()
  @IsBase64()
  front?: string = undefined;
  @IsOptional()
  @IsBase64()
  back?: string = undefined;
  @IsOptional()
  @IsBase64()
  selfie?: string = undefined;

  @IsOptional()
  @IsDate()
  @MaxDate(new Date())
  verifiedAt?: Date = undefined;

  constructor(data: Partial<DocumentSchema>) {
    super(data);

    // Assign all props
    Object.getOwnPropertyNames(this).map(prop => (this[prop] = data[prop]));
  }
}
