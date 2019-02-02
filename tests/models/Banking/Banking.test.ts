import * as uuid from "uuid/v4";
import { BankingSchema, BankingType, Consumer, Banking } from "../../../lib";
import { TEST_CONSUMER } from "../Consumer/Consumer.test";

export const TEST_BANKING = (): BankingSchema => ({
  id: uuid(),
  account: 12345,
  accountDigit: "123456",
  agency: 1234,
  agencyDigit: "1234",
  bank: 341,
  type: BankingType.CHECKING,
  consumer: new Consumer(TEST_CONSUMER),
  createdAt: new Date(),
  updatedAt: new Date()
});

describe("lib.models.Banking", () => {
  it("should instantiate properly", async () => {
    const schema = TEST_BANKING();
    const banking = new Banking(schema);

    expect(banking.type).toBe(schema.type);
    expect(banking.account).toBe(schema.account);
    expect(banking.accountDigit).toBe(schema.accountDigit);
    expect(banking.agency).toBe(schema.agency);
    expect(banking.agencyDigit).toBe(schema.agencyDigit);
    expect(banking.bank).toBe(schema.bank);
    expect(banking.consumer).toBe(schema.consumer);

    expect(await banking.isValid()).toBe(true);
  });
});
