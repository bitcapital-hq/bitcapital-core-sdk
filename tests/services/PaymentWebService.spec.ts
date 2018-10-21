import MockAdapter from "axios-mock-adapter";
import * as uuid from "uuid/v4";
import { PaymentWebService } from "../../lib";
import { TEST_PAYMENT } from "../models/Payment/Payment.test";
import { TEST_ASSET } from "../models/Asset/Asset.test";
import { TEST_RECIPIENT } from "../models/Payment/Recipient.test";

describe("lib.services.PaymentWebService", () => {
  describe("Success cases", () => {
    beforeAll(() => {
      PaymentWebService.initialize({
        baseURL: "http://localhost:3000/test_url",
        clientId: "test",
        clientSecret: "test"
      });
      const mock = new MockAdapter((PaymentWebService.getInstance() as any).http.client);

      mock.onGet("/payments/" + TEST_PAYMENT.id).reply(200, TEST_PAYMENT);
      mock.onPost(`/payments/${TEST_ASSET.id}`).reply(200, TEST_PAYMENT);
    });

    it("should find one", async () => {
      const one = await PaymentWebService.getInstance().findOne(TEST_PAYMENT.id);

      expect(one).toEqual(TEST_PAYMENT);
    });

    it("should pay", async () => {
      const one = await PaymentWebService.getInstance().pay({
        source: uuid(),
        recipients: [TEST_RECIPIENT, TEST_RECIPIENT],
        asset: TEST_ASSET.id
      });

      expect(one).toEqual(TEST_PAYMENT);
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

      mock.onGet("/payments/" + TEST_PAYMENT.id).reply(500);
      mock.onPost(`/payments/${TEST_ASSET.id}`).reply(500);
    });

    it("should find one", async () => {
      expect.assertions(1);
      return expect(PaymentWebService.getInstance().findOne(TEST_PAYMENT.id)).rejects.toBeTruthy();
    });

    it("should pay", async () => {
      expect.assertions(1);
      return expect(
        PaymentWebService.getInstance().pay({
          source: uuid(),
          recipients: [TEST_RECIPIENT, TEST_RECIPIENT],
          asset: TEST_ASSET.id
        })
      ).rejects.toBeTruthy();
    });
  });
});
