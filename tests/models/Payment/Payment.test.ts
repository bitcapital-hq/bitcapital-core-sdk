import * as uuid from "uuid/v4";
import * as faker from "faker";
import { PaymentType, PaymentSchema } from "bitcapital-common";
import { TEST_WALLET } from "../Wallet/Wallet.test";

export interface TestPaymentSchema extends PaymentSchema {
  id: string;
}

export const TEST_PAYMENT = (): TestPaymentSchema => ({
  id: uuid(),
  type: PaymentType[faker.random.number(2)] as PaymentType,
  amount: faker.finance.amount(),
  destination: TEST_WALLET()
});
