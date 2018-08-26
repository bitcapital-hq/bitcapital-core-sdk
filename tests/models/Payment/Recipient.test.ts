import * as hat from "hat";
import * as uuid from "uuid/v4";
import { StellarWalletData, WalletType, Recipient, Wallet, RecipientSchema } from "../../../lib";

export const TEST_RECIPIENT: RecipientSchema = {
  amount: "1.00",
  destination: uuid()
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
