import * as hat from "hat";
import { Wallet, WalletSchema } from "../../../lib";

export const TEST_WALLET: WalletSchema = {
  address: hat()
};

describe("lib.models.Consumer.Wallet", () => {
  it("should instantiate properly", async () => {
    const wallet = new Wallet({ ...TEST_WALLET });

    expect(wallet.address).toBe(TEST_WALLET.address);
  });
});
