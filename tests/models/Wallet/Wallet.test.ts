import * as hat from "hat";
import { Wallet, WalletType, StellarWalletData } from "../../../lib";

const TEST_WALLET = {
  type: WalletType.STELLAR,
  data: { publicKey: hat() } as StellarWalletData
};

describe("lib.models.Wallet", () => {
  it("should instantiate properly", async () => {
    const wallet = new Wallet({ ...TEST_WALLET });
    expect(wallet.type).toBe(TEST_WALLET.type);
    expect(wallet.data).toBe(TEST_WALLET.data);
  });
});
