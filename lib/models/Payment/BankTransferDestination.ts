import { IsNotEmpty } from "../../../node_modules/class-validator";

export interface BankTransferDestinationSchema {
  account: number;
  accountDigit: string;
  agency: number;
  agencyDigit: string;
  bank: number;
  name: string;
  taxIdNumber: string;
  type: string;
}

export class BankTransferDestination implements BankTransferDestinationSchema {
  @IsNotEmpty() account: number = undefined;
  @IsNotEmpty() accountDigit: string = undefined;
  @IsNotEmpty() agency: number = undefined;
  @IsNotEmpty() agencyDigit: string = undefined;
  @IsNotEmpty() bank: number = undefined;
  @IsNotEmpty() name: string = undefined;
  @IsNotEmpty() taxIdNumber: string = undefined;
  @IsNotEmpty() type: string = undefined;

  constructor(data: Partial<BankTransferDestinationSchema>) {
    Object.assign(this, data);
  }
}
