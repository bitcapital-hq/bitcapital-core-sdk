import * as hat from "hat";
import { StellarWalletData, WalletType, Recipient, Wallet, Payment, Transaction, TransactionType } from "../../../lib";

const TEST_RECIPIENT = {
  amount: "1.00"
};

const TEST_WALLET = {
  type: WalletType.STELLAR,
  data: { publicKey: hat() } as StellarWalletData
};

describe("lib.models.Transaction", () => {
  it("should instantiate properly", async () => {
    const transaction = new Transaction({
      data: {},
      type: TransactionType.PAYMENT,
      source: new Wallet({ ...TEST_WALLET }),
      payments: [
        new Payment({
          source: new Wallet({ ...TEST_WALLET }),
          recipients: [
            new Recipient({
              ...TEST_RECIPIENT,
              destination: new Wallet({ ...TEST_WALLET })
            })
          ]
        })
      ]
    });
    expect(transaction.source).toBeDefined();
    expect(transaction.source.type).toBeDefined();

    expect(await transaction.isValid()).toBe(true);
  });
});
