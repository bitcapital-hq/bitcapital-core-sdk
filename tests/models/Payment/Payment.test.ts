import * as hat from "hat";
import * as uuid from "uuid/v4";
import { StellarWalletData, WalletType, Recipient, Wallet, Payment } from "../../../lib";

const TEST_RECIPIENT = {
  amount: "1.00"
};

const TEST_WALLET = {
  type: WalletType.STELLAR,
  data: { publicKey: hat() } as StellarWalletData
};

export const TEST_PAYMENT = {
  id: uuid(),
  source: TEST_WALLET,
  recipients: [{ ...TEST_RECIPIENT, destination: TEST_WALLET }],
  transaction: undefined
};

describe("lib.models.Payment", () => {
  it("should instantiate properly", async () => {
    const recipient = new Payment({
      source: new Wallet({ ...TEST_WALLET }),
      recipients: [
        new Recipient({
          ...TEST_RECIPIENT,
          destination: new Wallet({ ...TEST_WALLET })
        })
      ]
    });
    expect(recipient.source).toBeDefined();
    expect(recipient.source.type).toBeDefined();
  });
});
