import MockAdapter from "axios-mock-adapter";
import { AssetWebService } from "../../lib";
import { TEST_ASSET } from "../models/Asset/Asset.test";
import { TEST_PAYMENT } from "../models/Payment/Payment.test";
import { CRUDWebServiceTest } from "./WebServiceUtil";

const assetSchema = TEST_ASSET();
const paymentSchema = TEST_PAYMENT();

describe("lib.services.AssetWebService", () => {
  CRUDWebServiceTest("assets", AssetWebService, assetSchema);

  describe("Success cases", () => {
    beforeAll(() => {
      AssetWebService.initialize({
        baseURL: "http://localhost:3000/test_url",
        clientId: "test",
        clientSecret: "test"
      });
      const mock = new MockAdapter((AssetWebService.getInstance() as any).http.client);

      mock.onPost(`/assets/${assetSchema.id}/emit`).reply(200, paymentSchema);
    });

    it("should emit", async () => {
      const payment = await AssetWebService.getInstance().emit({ amount: "0", id: assetSchema.id });

      expect(payment).toEqual(paymentSchema);
    });
  });

  describe("Fail cases", () => {
    beforeAll(() => {
      AssetWebService.initialize({
        baseURL: "http://localhost:3000/test_url",
        clientId: "test",
        clientSecret: "test"
      });
      const mock = new MockAdapter((AssetWebService.getInstance() as any).http.client);

      mock.onPost(`/assets/${assetSchema.id}/emit`).reply(500);
    });

    it("should failt to emit", async () => {
      expect.assertions(1);
      return expect(AssetWebService.getInstance().emit({ amount: "0", id: assetSchema.id })).rejects.toBeTruthy();
    });
  });
});
