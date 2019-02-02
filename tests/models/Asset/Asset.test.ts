import * as faker from "faker";
import { AssetSchema, Asset, Wallet, Payment } from "../../../lib";
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

describe("lib.models.Asset", () => {
  it("should instantiate a valid instance", async () => {
    const schema = TEST_ASSET();
    const asset = new Asset(schema);

    expect(asset.id).toBe(schema.id);
    expect(asset.name).toBe(schema.name);
    expect(asset.code).toBe(schema.code);
    expect(asset.issuer).toBeInstanceOf(Wallet);
    asset.wallets.forEach(wallet => expect(wallet).toBeInstanceOf(Wallet));
    asset.payments.forEach(payment => expect(payment).toBeInstanceOf(Payment));

    expect(await asset.isValid()).toBe(true);
  });
});
