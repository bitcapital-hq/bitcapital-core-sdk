import MockAdapter from "axios-mock-adapter";
import { PaymentWebService } from "../../lib";
import { TEST_PAYMENT } from "../models/Payment/Payment.test";

describe("lib.services.PaymentWebService", () => {
  beforeAll(() => {
    PaymentWebService.initialize({
      baseURL: "http://localhost:3000/test_url"
    });
    const mock = new MockAdapter((PaymentWebService.getInstance() as any).http.client);

    mock.onGet("/payments/" + TEST_PAYMENT.id).reply(200, TEST_PAYMENT);
  });

  it("should find one", async () => {
    const one = await PaymentWebService.getInstance().findOne(TEST_PAYMENT.id);

    expect(one).toEqual(TEST_PAYMENT);
  });
});
