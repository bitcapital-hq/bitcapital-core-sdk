import { Wallet, Payment, Transaction, TransactionType } from "../../../lib";
import { TEST_PAYMENT } from "../Payment/Payment.test";
import { TEST_WALLET } from "../Wallet/Wallet.test";

describe("lib.models.Transaction", () => {
  it("should instantiate properly", async () => {
    const transaction = new Transaction({
      type: TransactionType.PAYMENT,
      source: new Wallet(TEST_WALLET),
      payments: [new Payment(TEST_PAYMENT)]
    });

    expect(await transaction.isValid()).toBe(true);
  });
});
