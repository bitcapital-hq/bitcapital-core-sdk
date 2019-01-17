import * as uuid from "uuid/v4";
import { Wallet, WalletSchema, WalletStatus, WalletProvider } from "../../../lib";

export const TEST_WALLET = (): WalletSchema => ({
  id: uuid(),
  status: WalletStatus.PENDING,
  provider: WalletProvider.CDT_CARDS,
  stellar: {
    publicKey: uuid(),
    secretKey: uuid()
  }
});

describe("lib.models.Wallet", () => {
  it("should instantiate properly", async () => {
    const schema = TEST_WALLET();
    const wallet = new Wallet(schema);

    expect(wallet.id).toBe(schema.id);
    expect(wallet.status).toBe(schema.status);
    expect(wallet.provider).toBe(schema.provider);

    expect(await wallet.isValid()).toBe(true);
  });
});
