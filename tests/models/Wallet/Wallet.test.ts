import * as uuid from "uuid/v4";
import { Wallet, WalletSchema, WalletStatus } from "../../../lib";

export const TEST_WALLET = (): WalletSchema => ({
  id: uuid(),
  status: WalletStatus.PENDING,
  stellar: {
    publicKey: uuid(),
    secretKey: uuid()
  }
});

export const TEST_WALLET_BANKING: WalletSchema = {
  id: uuid(),
  additionalData: {
    bankCode: "341",
    accountAgency: "1234",
    accountNumber: "12345",
    accountDocument: ""
  }
};

describe("lib.models.Wallet", () => {
  it("should instantiate properly", async () => {
    const schema = TEST_WALLET();
    const wallet = new Wallet(schema);

    expect(wallet.id).toBe(schema.id);
    expect(wallet.status).toBe(schema.status);
    expect(await wallet.isValid()).toBe(true);
  });
});
