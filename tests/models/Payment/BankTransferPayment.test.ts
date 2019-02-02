import * as uuid from "uuid/v4";
import { BankTransferPaymentSchema, BankTransferPayment, Wallet } from "../../../lib";
import { TEST_WALLET_BANKING } from "../Wallet/Wallet.test";
import { BankTransferDestination } from "../../../lib/models/Payment/BankTransferDestination";
import { BankTransfer } from "../../../lib/models/Payment/BankTransfer";

export const TEST_WITHDRAWAL = (): BankTransferPaymentSchema => ({
  id: uuid(),
  type: "cash_out",
  bitcapitalCoreId: "43e57550-93d7-4609-9bf6-ff9d2313ec98",
  transactionCode: "1433ca44-47eb-11e8-842f-0ed5f89f715d",
  source: new Wallet(TEST_WALLET_BANKING),
  amount: "1000",
  bankTransfer: new BankTransfer({
    destination: new BankTransferDestination({
      account: 12345,
      accountDigit: "123456",
      agency: 1234,
      agencyDigit: "1234",
      bank: 341,
      name: "Itaú",
      taxIdNumber: "19640475874",
      type: "savings"
    }),
    identificator: 123456789,
    subIssuerCode: 123456789
  })
});

describe("lib.models.BankTransferPayment", () => {
  it("should instantiate properly", async () => {
    const schema = TEST_WITHDRAWAL();
    const withdrawal = new BankTransferPayment(schema);

    expect(withdrawal.amount).toBe(schema.amount);
    expect(withdrawal.bankTransfer.destination).toBe(schema.bankTransfer.destination);
    expect(withdrawal.bankTransfer.identificator).toBe(schema.bankTransfer.identificator);
    expect(withdrawal.bankTransfer.subIssuerCode).toBe(schema.bankTransfer.subIssuerCode);
    expect(withdrawal.bitcapitalCoreId).toBe(schema.bitcapitalCoreId);
    expect(withdrawal.source).toBe(schema.source);
    expect(withdrawal.transactionCode).toBe(schema.transactionCode);
    expect(withdrawal.type).toBe(schema.type);

    expect(await withdrawal.isValid()).toBe(true);
  });
});
