import * as hat from "hat";
import { StellarWalletData, WalletType, Recipient, Wallet } from "../../../lib";

const TEST_RECIPIENT = {
  amount: "1.00"
};

const TEST_WALLET = {
  type: WalletType.STELLAR,
  data: { publicKey: hat() } as StellarWalletData
};

describe("lib.models.Recipient", () => {
  it("should instantiate properly", async () => {
    const recipient = new Recipient({
      ...TEST_RECIPIENT,
      destination: new Wallet({ ...TEST_WALLET })
    });
    expect(recipient.amount).toBe(TEST_RECIPIENT.amount);
  });
});
