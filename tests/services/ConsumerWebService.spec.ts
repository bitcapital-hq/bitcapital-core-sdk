import { ConsumerWebService } from "../../lib";
import { TEST_USER } from "../models/User/User.test";
import { CRUDWebServiceTest } from "./WebServiceUtil";
import MockAdapter from "axios-mock-adapter";
import { TEST_DOCUMENT } from "../models/Consumer/Document.test";

const userSchema = TEST_USER({ consumer: true, credentials: false });
const documentSchema = TEST_DOCUMENT();

describe("lib.services.ConsumerWebService", () => {
  CRUDWebServiceTest("consumers", ConsumerWebService, userSchema);

  describe("Success cases", () => {
    beforeAll(() => {
      ConsumerWebService.initialize({
        baseURL: "http://localhost:3000/test_url",
        clientId: "test",
        clientSecret: "test"
      });
      const mock = new MockAdapter((ConsumerWebService.getInstance() as any).http.client);

      mock.onGet(`/consumers/${userSchema.id}/documents`).reply(200, userSchema.consumer.documents);
      mock
        .onGet(`/consumers/${userSchema.id}/documents/${userSchema.consumer.documents[0].type}`)
        .reply(200, userSchema.consumer.documents[0]);
      mock.onGet(`/consumers/${userSchema.id}/wallets`).reply(200, userSchema.wallets);
      mock.onPost(`/consumers/${userSchema.id}/documents`).reply(200, documentSchema);
    });

    it("should find documents", async () => {
      const documents = await ConsumerWebService.getInstance().findDocumentsById(userSchema.id);

      expect(documents.length).toBe(userSchema.consumer.documents.length);
      expect(documents[0]).toMatchObject(userSchema.consumer.documents[0]);
    });

    it("should find document by type", async () => {
      const document = await ConsumerWebService.getInstance().findDocumentByIdAndType(
        userSchema.id,
        userSchema.consumer.documents[0].type
      );

      expect(document).toMatchObject(userSchema.consumer.documents[0]);
    });

    it("should create a document", async () => {
      const document = await ConsumerWebService.getInstance().createDocument(userSchema.id, documentSchema);

      expect(document).toMatchObject(documentSchema);
    });

    it("should find wallets", async () => {
      const wallets = await ConsumerWebService.getInstance().findWalletsById(userSchema.id);

      expect(wallets.length).toBe(3);
      expect(wallets[0]).toMatchObject(userSchema.wallets[0]);
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

      mock.onGet(`/consumers/${userSchema.id}/documents`).reply(500);
      mock.onGet(`/consumers/${userSchema.id}/documents/${userSchema.consumer.documents[0].type}`).reply(500);
      mock.onGet(`/consumers/${userSchema.id}/wallets`).reply(500);
      mock.onPost(`/consumers/${userSchema.id}/documents`).reply(500);
    });

    it("should fail to find documents", async () => {
      expect.assertions(1);
      return expect(ConsumerWebService.getInstance().findDocumentsById(userSchema.id)).rejects.toBeTruthy();
    });

    it("should fail to find document by type", async () => {
      expect.assertions(1);
      return expect(
        ConsumerWebService.getInstance().findDocumentByIdAndType(userSchema.id, userSchema.consumer.documents[0].type)
      ).rejects.toBeTruthy();
    });

    it("should failt to create a document", async () => {
      expect.assertions(1);
      return expect(
        ConsumerWebService.getInstance().createDocument(userSchema.id, TEST_DOCUMENT())
      ).rejects.toBeTruthy();
    });

    it("should fail to find wallets", async () => {
      expect.assertions(1);
      return expect(ConsumerWebService.getInstance().findWalletsById(userSchema.id)).rejects.toBeTruthy();
    });
  });
});
