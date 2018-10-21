import { DomainWebService } from "../../lib";
import { TEST_DOMAIN } from "../models/Domain/Domain.test";
import { CRUDWebServiceTest } from "./WebServiceUtil";
import MockAdapter from "axios-mock-adapter";
import { TEST_USER } from "../models/User/User.test";

describe("lib.services.DomainWebService", () => {
  CRUDWebServiceTest("domains", DomainWebService, TEST_DOMAIN);

  describe("Success cases", () => {
    beforeAll(() => {
      DomainWebService.initialize({
        baseURL: "http://localhost:3000/test_url",
        clientId: "test",
        clientSecret: "test"
      });
      const mock = new MockAdapter((DomainWebService.getInstance() as any).http.client);

      mock.onGet(`/domains/root`).reply(200, TEST_DOMAIN);
      mock.onGet(`/domains/${TEST_DOMAIN.id}/users`).reply(200, [TEST_USER, TEST_USER, TEST_USER]);
      mock.onGet(`/domains/${TEST_DOMAIN.id}/consumers`).reply(200, [TEST_USER, TEST_USER, TEST_USER]);
      mock.onGet(`/domains/${TEST_DOMAIN.id}/mediators`).reply(200, [TEST_USER, TEST_USER, TEST_USER]);
    });

    it("should find the root domain", async () => {
      const root = await DomainWebService.getInstance().findRootDomain();

      expect(root).toEqual(TEST_DOMAIN);
    });

    it("should find the mediators", async () => {
      const mediators = await DomainWebService.getInstance().findConsumersById(TEST_DOMAIN.id);

      expect(mediators.length).toBe(3);
      expect(mediators[0]).toEqual(TEST_USER);
    });

    it("should find the consumers", async () => {
      const consumers = await DomainWebService.getInstance().findMediatorsById(TEST_DOMAIN.id);

      expect(consumers.length).toBe(3);
      expect(consumers[0]).toEqual(TEST_USER);
    });
  });

  describe("Fail cases", () => {
    beforeAll(() => {
      DomainWebService.initialize({
        baseURL: "http://localhost:3000/test_url"
      });
      const mock = new MockAdapter((DomainWebService.getInstance() as any).http.client);

      mock.onGet(`/domains/root`).reply(500);
      mock.onGet(`/domains/${TEST_DOMAIN.id}/users`).reply(500);
      mock.onGet(`/domains/${TEST_DOMAIN.id}/consumers`).reply(500);
      mock.onGet(`/domains/${TEST_DOMAIN.id}/mediators`).reply(500);
    });

    it("should fail to find the root domain", async () => {
      expect.assertions(1);
      return expect(DomainWebService.getInstance().findRootDomain()).rejects.toBeTruthy();
    });

    it("should fail to find the mediators", async () => {
      expect.assertions(1);
      return expect(DomainWebService.getInstance().findConsumersById(TEST_DOMAIN.id)).rejects.toBeTruthy();
    });

    it("should fail to find the consumers", async () => {
      expect.assertions(1);
      return expect(DomainWebService.getInstance().findMediatorsById(TEST_DOMAIN.id)).rejects.toBeTruthy();
    });
  });
});
