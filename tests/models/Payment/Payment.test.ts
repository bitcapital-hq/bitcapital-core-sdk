import * as uuid from "uuid/v4";
import * as faker from "faker";
import { Wallet, Payment, PaymentType, PaymentSchema } from "../../../lib";
import { TEST_WALLET } from "../Wallet/Wallet.test";

export interface TestPaymentSchema extends PaymentSchema {
  id: string;
}

export const TEST_PAYMENT = (): TestPaymentSchema => ({
  id: uuid(),
  type: PaymentType[faker.random.number(2)] as PaymentType,
  amount: faker.finance.amount(),
  destination: TEST_WALLET()
});

describe("lib.models.Payment", () => {
  it("should instantiate properly", async () => {
    const schema = TEST_PAYMENT();
    const payment = new Payment(schema);

    expect(payment.id).toBe(schema.id);
    expect(payment.type).toBe(schema.type);
    expect(payment.amount).toBe(schema.amount);
    expect(payment.destination).toBeInstanceOf(Wallet);
  });
});
