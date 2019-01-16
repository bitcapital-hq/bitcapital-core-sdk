import { BaseModel, BaseModelSchema } from "..";
import { IsOptional, IsNotEmpty } from "../../../node_modules/class-validator";

export interface BoletoSchema extends BaseModelSchema {
  conductorId?: number;
  documentNumber?: string;
  expiresAt: Date;
  amount: number;
  beneficiaryName?: string;
  beneficiaryCode?: string;
  beneficiaryDocument?: string;
  bank?: string;
  agency?: string;
  agreementNumber?: string;
  agreementNumberDigit?: string;
  conductorNumber?: string;
  conductorNumberDigit?: string;
  barCode?: string;
  digitableLine?: string;
  isRegistered?: boolean;
}

export default class Boleto extends BaseModel implements BoletoSchema {
  @IsOptional() conductorId?: number;
  @IsOptional() documentNumber?: string;
  @IsNotEmpty() expiresAt: Date;
  @IsNotEmpty() amount: number;
  @IsOptional() beneficiaryName?: string;
  @IsOptional() beneficiaryCode?: string;
  @IsOptional() beneficiaryDocument?: string;
  @IsOptional() bank?: string;
  @IsOptional() agency?: string;
  @IsOptional() agreementNumber?: string;
  @IsOptional() agreementNumberDigit?: string;
  @IsOptional() conductorNumber?: string;
  @IsOptional() conductorNumberDigit?: string;
  @IsOptional() barCode?: string;
  @IsOptional() digitableLine?: string;
  @IsOptional() isRegistered?: boolean = false;

  constructor(data: Partial<BoletoSchema>) {
    super(data);

    // Assign all props
    Object.getOwnPropertyNames(this).map(prop => (this[prop] = data[prop]));
  }
}
