import MockAdapter from "axios-mock-adapter";
import * as uuid from "uuid/v4";
import { PaymentWebService, WithdrawalRequestSchema } from "../../lib";
import { TEST_PAYMENT } from "../models/Payment/Payment.test";
import { TEST_ASSET } from "../models/Asset/Asset.test";
import { TEST_WITHDRAWAL } from "../models/Payment/BankTransferPayment.test";
import { TEST_WALLET } from "../models/Wallet/Wallet.test";

const withdrawalSchema = TEST_WITHDRAWAL();

describe("lib.services.PaymentWebService", () => {
  const withdrawalRequestData = {
    bankingId: "6d1d9504-ec51-4bf9-bdb2-374dfbedb122",
    description: "Pagamento de fornecedores"
  } as WithdrawalRequestSchema;

  describe("Success cases", () => {
    beforeAll(() => {
      PaymentWebService.initialize({
        baseURL: "http://localhost:3000/test_url",
        clientId: "test",
        clientSecret: "test"
      });
      const mock = new MockAdapter((PaymentWebService.getInstance() as any).http.client);

      mock.onGet("/payments/" + TEST_PAYMENT().id).reply(200, TEST_PAYMENT);
      mock.onPost(`/payments/${TEST_ASSET().id}`).reply(200, TEST_PAYMENT);
      mock
        .onPost(`/payments/withdraw/${withdrawalRequestData.bankingId}`, {
          amount: 1000,
          description: "Pagamento de fornecedores"
        })
        .reply(200, withdrawalSchema);
    });

    it("should find one", async () => {
      const one = await PaymentWebService.getInstance().findOne(TEST_PAYMENT().id);

      expect(one).toEqual(TEST_PAYMENT);
    });

    it("should pay", async () => {
      const one = await PaymentWebService.getInstance().pay({
        source: uuid(),
        asset: TEST_ASSET().id,
        recipients: [
          {
            amount: "10.00",
            destination: TEST_WALLET().id
          }
        ]
      });

      expect(one).toEqual(TEST_PAYMENT);
    });

    it("should perform withdrawal successfully", async () => {
      const response = await PaymentWebService.getInstance().withdraw(withdrawalRequestData);
      expect(response).toEqual(withdrawalSchema);
    });
  });

  describe("Fail cases", () => {
    beforeAll(() => {
      PaymentWebService.initialize({
        baseURL: "http://localhost:3000/test_url",
        clientId: "test",
        clientSecret: "test"
      });
      const mock = new MockAdapter((PaymentWebService.getInstance() as any).http.client);

      mock.onGet("/payments/" + TEST_PAYMENT().id).reply(500);
      mock.onPost(`/payments/${TEST_ASSET().id}`).reply(500);
    });

    it("should find one", async () => {
      expect.assertions(1);
      return expect(PaymentWebService.getInstance().findOne(TEST_PAYMENT().id)).rejects.toBeTruthy();
    });

    it("should pay", async () => {
      expect.assertions(1);
      return expect(
        PaymentWebService.getInstance().pay({
          source: uuid(),
          recipients: [
            {
              amount: "10.00",
              destination: TEST_WALLET().id
            }
          ]
        })
      ).rejects.toBeTruthy();
    });
  });
});
