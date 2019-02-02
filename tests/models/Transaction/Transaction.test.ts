import { Wallet, Payment, Transaction, TransactionType, TransactionSchema, User } from "../../../lib";
import { TEST_PAYMENT } from "../Payment/Payment.test";
import { TEST_WALLET } from "../Wallet/Wallet.test";
import * as faker from "faker";
import * as uuid from "uuid/v4";
import { TEST_USER } from "../User/User.test";

const TEST_TRANSACTION = (): TransactionSchema => ({
  id: uuid(),
  type: TransactionType.PAYMENT,
  source: TEST_WALLET(),
  payments: Array.from({ length: faker.random.number(5) }, () => TEST_PAYMENT()),
  createdBy: TEST_USER(),
  additionalData: {
    asset_code: faker.finance.currencyCode(),
    asset_id: uuid(),
    hash: uuid(),
    wallet_id: uuid()
  }
});

describe("lib.models.Transaction", () => {
  it("should instantiate properly", async () => {
    const schema = TEST_TRANSACTION();
    const transaction = new Transaction(schema);

    expect(transaction.id).toBe(schema.id);
    expect(transaction.type).toBe(schema.type);
    expect(transaction.source).toBeInstanceOf(Wallet);
    transaction.payments.forEach(payment => expect(payment).toBeInstanceOf(Payment));
    expect(transaction.createdBy).toBeInstanceOf(User);
    expect(transaction.additionalData).toMatchObject(schema.additionalData);

    expect(await transaction.isValid()).toBe(true);
  });
});
