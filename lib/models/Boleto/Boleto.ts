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

export class Boleto extends BaseModel implements BoletoSchema {
  @IsOptional() conductorId?: number = undefined;
  @IsOptional() documentNumber?: string = undefined;
  @IsNotEmpty() expiresAt: Date = undefined;
  @IsNotEmpty() amount: number = undefined;
  @IsOptional() beneficiaryName?: string = undefined;
  @IsOptional() beneficiaryCode?: string = undefined;
  @IsOptional() beneficiaryDocument?: string = undefined;
  @IsOptional() bank?: string = undefined;
  @IsOptional() agency?: string = undefined;
  @IsOptional() agreementNumber?: string = undefined;
  @IsOptional() agreementNumberDigit?: string = undefined;
  @IsOptional() conductorNumber?: string = undefined;
  @IsOptional() conductorNumberDigit?: string = undefined;
  @IsOptional() barCode?: string = undefined;
  @IsOptional() digitableLine?: string = undefined;
  @IsOptional() isRegistered?: boolean = false;

  constructor(data: Partial<BoletoSchema>) {
    super(data);
    Object.assign(this, data);
  }
}
