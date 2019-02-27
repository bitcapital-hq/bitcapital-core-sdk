import * as uuid from "uuid/v4";
import { BankingSchema, BankingType } from "bitcapital-common";

export const TEST_BANKING = (): BankingSchema => ({
  id: uuid(),
  account: 12345,
  accountDigit: "123456",
  agency: 1234,
  agencyDigit: "1234",
  bank: 341,
  type: BankingType.CHECKING,
  createdAt: new Date(),
  updatedAt: new Date()
});
