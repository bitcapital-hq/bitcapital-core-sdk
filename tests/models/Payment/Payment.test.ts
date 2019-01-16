import * as uuid from "uuid/v4";
import { Wallet, Payment, PaymentType, PaymentSchema } from "../../../lib";
import { TEST_WALLET } from "../Wallet/Wallet.test";

const TEST_RECIPIENT = {
  amount: "1.00"
};

export const TEST_PAYMENT: PaymentSchema = {
  id: uuid(),
  type: PaymentType.TRANSFER,
  amount: "123.45",
  destination: TEST_WALLET
};

describe("lib.models.Payment", () => {
  it("should instantiate properly", async () => {
    const payment = new Payment(TEST_PAYMENT);

    expect(payment.type).toBe(PaymentType.TRANSFER);
    expect(payment.amount).toBe("123.45");
  });
});
