import { BoletoPaymentResponseSchema, BoletoPaymentResponse } from "../../../lib";

export const TEST_BOLETO_PAYMENT_RESPONSE: BoletoPaymentResponseSchema = {
  paymentId: 123456789,
  accountId: 123456789,
  status: "PAID",
  description: "Description",
  barcode: "23790504004188102313343008109209176890000019900",
  expiresAt: new Date(2019, 1, 31),
  recipientName: "BitCapital",
  discount: 0,
  taxAmount: 0,
  amount: 1000.0
};

describe("lib.models.BoletoPaymentResponse", () => {
  it("should instantiate properly", async () => {
    const boletoPaymentResponse = new BoletoPaymentResponse({ ...TEST_BOLETO_PAYMENT_RESPONSE });
    expect(await boletoPaymentResponse.isValid()).toBe(true);
  });
});
