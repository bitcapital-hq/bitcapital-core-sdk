import {
  BoletoValidateResponseSchema,
  TradersInfo,
  PaymentInfo,
  BoletoInfo,
  PaymentAmountDetails,
  PartialAmountDetails
} from "bitcapital-common";

export const TEST_BOLETO_VALIDATE_RESPONSE: BoletoValidateResponseSchema = {
  paid: true,
  boletoInfo: new BoletoInfo({
    description: "Description",
    amount: 1000.0,
    expiresAt: new Date(2019, 1, 31),
    hasExpirationDate: true,
    barcodeNumber: "23790504004188102313343008109209176890000019900"
  }),
  paymentInfo: new PaymentInfo({
    contractId: "123456789",
    idNumber: "123456789",
    traders: new TradersInfo({
      recipient: "BitCapital",
      recipientDocument: "09.072.897/0001-33",
      payerName: "Cliente X",
      payerDocument: "99.999.999/0001-99"
    }),
    expiresAt: new Date(2019, 1, 31),
    totalAmount: 1000.0,
    amountDetails: new PaymentAmountDetails({
      interestAmount: 0,
      discount: 0,
      fineAmount: 0,
      totalAmount: 1000.0,
      paymentAmountUpdated: 1000.0,
      calculationDate: new Date()
    }),
    acceptPartialAmount: new PartialAmountDetails({
      code: 0,
      description: "Não aceita"
    }),
    barcode: "23790504004188102313343008109209176890000019900",
    digitableLine: "23790.50400.418810.2313343008109209 1 76890000019900",
    paymentDeadline: new Date(2019, 1, 31),
    validDate: true,
    nextBusinessDay: ""
  })
};
