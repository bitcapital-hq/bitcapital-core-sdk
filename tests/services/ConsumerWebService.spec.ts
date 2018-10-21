import { ConsumerWebService } from "../../lib";
import { TEST_USER } from "../models/User/User.test";
import { CRUDWebServiceTest } from "./WebServiceUtil";
import MockAdapter from "axios-mock-adapter";
import { TEST_DOCUMENT } from "../models/Consumer/Document.test";
import { TEST_WALLET } from "../models/Wallet/Wallet.test";

describe("lib.services.ConsumerWebService", () => {
  CRUDWebServiceTest("consumers", ConsumerWebService, TEST_USER);

  describe("Success cases", () => {
    beforeAll(() => {
      ConsumerWebService.initialize({
        baseURL: "http://localhost:3000/test_url",
        clientId: "test",
        clientSecret: "test"
      });
      const mock = new MockAdapter((ConsumerWebService.getInstance() as any).http.client);

      mock.onGet(`/consumers/${TEST_USER.id}/documents`).reply(200, [TEST_DOCUMENT, TEST_DOCUMENT, TEST_DOCUMENT]);
      mock.onGet(`/consumers/${TEST_USER.id}/documents/${TEST_DOCUMENT.type}`).reply(200, TEST_DOCUMENT);
      mock.onGet(`/consumers/${TEST_USER.id}/wallets`).reply(200, [TEST_WALLET, TEST_WALLET, TEST_WALLET]);
      mock.onPost(`/consumers/${TEST_USER.id}/documents`).reply(200, TEST_DOCUMENT);
    });

    it("should find documents", async () => {
      const documents = await ConsumerWebService.getInstance().findDocumentsById(TEST_USER.id);

      expect(documents.length).toBe(3);
      expect(documents[0]).toEqual(TEST_DOCUMENT);
    });

    it("should find document by type", async () => {
      const document = await ConsumerWebService.getInstance().findDocumentByIdAndType(TEST_USER.id, TEST_DOCUMENT.type);

      expect(document).toEqual(TEST_DOCUMENT);
    });

    it("should create a document", async () => {
      const document = await ConsumerWebService.getInstance().createDocument(TEST_USER.id, TEST_DOCUMENT);

      expect(document).toEqual(TEST_DOCUMENT);
    });

    it("should find wallets", async () => {
      const wallets = await ConsumerWebService.getInstance().findWalletsById(TEST_USER.id);

      expect(wallets.length).toBe(3);
      expect(wallets[0]).toEqual(TEST_WALLET);
    });
  });

  describe("Fail cases", () => {
    beforeAll(() => {
      ConsumerWebService.initialize({
        baseURL: "http://localhost:3000/test_url",
        clientId: "test",
        clientSecret: "test"
      });
      const mock = new MockAdapter((ConsumerWebService.getInstance() as any).http.client);

      mock.onGet(`/consumers/${TEST_USER.id}/documents`).reply(500);
      mock.onGet(`/consumers/${TEST_USER.id}/documents/${TEST_DOCUMENT.type}`).reply(500);
      mock.onGet(`/consumers/${TEST_USER.id}/wallets`).reply(500);
      mock.onPost(`/consumers/${TEST_USER.id}/documents`).reply(500);
    });

    it("should fail to find documents", async () => {
      expect.assertions(1);
      return expect(ConsumerWebService.getInstance().findDocumentsById(TEST_USER.id)).rejects.toBeTruthy();
    });

    it("should fail to find document by type", async () => {
      expect.assertions(1);
      return expect(
        ConsumerWebService.getInstance().findDocumentByIdAndType(TEST_USER.id, TEST_DOCUMENT.type)
      ).rejects.toBeTruthy();
    });

    it("should failt to create a document", async () => {
      expect.assertions(1);
      return expect(ConsumerWebService.getInstance().createDocument(TEST_USER.id, TEST_DOCUMENT)).rejects.toBeTruthy();
    });

    it("should fail to find wallets", async () => {
      expect.assertions(1);
      return expect(ConsumerWebService.getInstance().findWalletsById(TEST_USER.id)).rejects.toBeTruthy();
    });
  });
});
