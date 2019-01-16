import * as uuid from "uuid/v4";
import { Wallet, WalletSchema, WalletStatus, WalletProvider } from "../../../lib";

export const TEST_WALLET: WalletSchema = {
  id: uuid(),
  status: WalletStatus.PENDING,
  provider: WalletProvider.CDT_CARDS,
  stellar: {
    publicKey: uuid(),
    secretKey: uuid()
  }
};

describe("lib.models.Wallet", () => {
  it("should instantiate properly", async () => {
    const wallet = new Wallet(TEST_WALLET);

    expect(await wallet.isValid()).toBe(true);
  });
});
