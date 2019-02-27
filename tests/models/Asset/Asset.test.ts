import * as faker from "faker";
import { AssetSchema } from "bitcapital-common";
import * as uuid from "uuid/v4";
import { TEST_WALLET } from "../Wallet/Wallet.test";
import { TEST_PAYMENT } from "../Payment/Payment.test";

export const TEST_ASSET = (): AssetSchema => ({
  id: uuid(),
  issuer: TEST_WALLET(),
  name: faker.finance.currencyName(),
  code: faker.finance.currencyCode(),
  wallets: Array.from({ length: faker.random.number(5) }, () => TEST_WALLET()),
  payments: Array.from({ length: faker.random.number(5) }, () => TEST_PAYMENT())
});
