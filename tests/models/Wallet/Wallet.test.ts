import * as hat from "hat";
import * as uuid from "uuid/v4";
import { Wallet, WalletType, StellarWalletData, WalletSchema } from "../../../lib";

export const TEST_WALLET: WalletSchema = {
  id: uuid(),
  type: WalletType.STELLAR,
  data: { publicKey: hat() } as StellarWalletData
};

describe("lib.models.Wallet", () => {
  it("should instantiate properly", async () => {
    const wallet = new Wallet({ ...TEST_WALLET });
    expect(wallet.type).toBe(TEST_WALLET.type);
    expect(wallet.data).toBe(TEST_WALLET.data);

    expect(await wallet.isValid()).toBe(true);
  });
});
