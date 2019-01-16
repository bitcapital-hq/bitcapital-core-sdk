import { BankTransferDestination } from "./BankTransferDestination";
import { IsNotEmpty } from "../../../node_modules/class-validator";

export interface BankTransferSchema {
  destination: BankTransferDestination;
  identificator: number;
  subIssuerCode: number;
}

export class BankTransfer implements BankTransferSchema {
  @IsNotEmpty() destination: BankTransferDestination = undefined;
  @IsNotEmpty() identificator: number = undefined;
  @IsNotEmpty() subIssuerCode: number = undefined;

  constructor(data: Partial<BankTransferSchema>) {
    Object.assign(this, data);
  }
}
