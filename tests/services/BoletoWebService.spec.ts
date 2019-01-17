import { CRUDWebServiceTest } from "./WebServiceUtil";
import MockAdapter from "axios-mock-adapter";
import * as fs from "fs";
import * as path from "path";
import * as uuid from "uuid/v4";
import { TEST_BOLETO } from "../models/Boleto/Boleto.test";
import { TEST_BOLETO_PAYMENT_RESPONSE } from "../models/Boleto/BoletoPaymentResponse.test";
import { TEST_BOLETO_VALIDATE_RESPONSE } from "../models/Boleto/BoletoValidateResponse.test";
import { BoletoWebService } from "../../lib";

describe("lib.services.BoletoWebService", () => {
  CRUDWebServiceTest("boletos", BoletoWebService, TEST_BOLETO);

  describe("Success cases", () => {
    beforeAll(() => {
      BoletoWebService.initialize({
        baseURL: "http://localhost:3000/test_url",
        clientId: "test",
        clientSecret: "test"
      });
      const mock = new MockAdapter((BoletoWebService.getInstance() as any).http.client);

      mock.onGet(`/boleto/${TEST_BOLETO.id}`).reply(200, TEST_BOLETO);
      mock
        .onGet("/boleto", { params: { barcode: TEST_BOLETO.barCode } })
        .reply(200, fs.readFileSync(path.join(__dirname, "../mocks/boleto/validate.json")).toString());

      mock
        .onPost(`/boleto/pay`, {
          userId: "123456789",
          barcode: TEST_BOLETO.barCode,
          description: "Pagamento de fornecedor"
        })
        .reply(200, TEST_BOLETO_PAYMENT_RESPONSE);
    });

    it("should find one boleto searching by its ID", async () => {
      const response = await BoletoWebService.getInstance().findOne(TEST_BOLETO.id);
      expect(response).toEqual(TEST_BOLETO);
    });

    it("should get boleto payment info using its barcode", async () => {
      const response = await BoletoWebService.getInstance().getPaymentInfo(TEST_BOLETO.barCode);
      expect(response).toEqual(TEST_BOLETO_VALIDATE_RESPONSE);
    });

    it("should performs boleto payment successfully", async () => {
      const response = await BoletoWebService.getInstance().pay({
        userId: "123456789",
        barcode: TEST_BOLETO.barCode,
        description: "Pagamento de fornecedor"
      });
      expect(response).toEqual(TEST_BOLETO_PAYMENT_RESPONSE);
    });
  });

  describe("Fail cases", () => {
    const fakeBoletoId = uuid();
    const fakeBoletoBarcode = "9999999999999999";

    beforeAll(() => {
      BoletoWebService.initialize({
        baseURL: "http://localhost:3000/test_url",
        clientId: "test",
        clientSecret: "test"
      });
      const mock = new MockAdapter((BoletoWebService.getInstance() as any).http.client);

      mock.onGet(`/boleto/${fakeBoletoId}`).reply(404);
      mock.onGet("/boleto", { params: { barcode: fakeBoletoBarcode } }).reply(400);

      mock
        .onPost(`/boleto/pay`, {
          userId: "123456789",
          barcode: fakeBoletoBarcode,
          amount: 10.0,
          description: "Pagamento de fornecedor"
        })
        .reply(400);

      mock
        .onPost(`/boleto/pay`, {
          userId: "123456789",
          barcode: fakeBoletoBarcode,
          description: "Pagamento de fornecedor"
        })
        .reply(400);
    });

    it("should fail to try to find an boleto ID that do not exists", async () => {
      expect.assertions(1);
      return expect(BoletoWebService.getInstance().findOne(fakeBoletoId)).rejects.toBeTruthy();
    });

    it("should fail to try to retrieve boleto payment data using an invalid barcode", async () => {
      expect.assertions(1);
      return expect(BoletoWebService.getInstance().getPaymentInfo(fakeBoletoBarcode)).rejects.toBeTruthy();
    });

    it("should fail to try to pay a boleto using an invalid barcode", async () => {
      expect.assertions(1);
      return expect(
        BoletoWebService.getInstance().pay({
          userId: "123456789",
          barcode: fakeBoletoBarcode,
          description: "Pagamento de boleto"
        })
      ).rejects.toBeTruthy();
    });

    it("should fail to try to pay an amount that differs from the original amount of boleto", async () => {
      expect.assertions(1);
      return expect(
        BoletoWebService.getInstance().pay({
          userId: "123456789",
          barcode: fakeBoletoBarcode,
          amount: 10.0,
          description: "Pagamento de boleto"
        })
      ).rejects.toBeTruthy();
    });
  });
});
