import { DomainWebService } from "../../lib";
import { TEST_DOMAIN } from "../models/Domain/Domain.test";
import { CRUDWebServiceTest } from "./WebServiceUtil";
import MockAdapter from "axios-mock-adapter";

const domainSchema = TEST_DOMAIN();

describe("lib.services.DomainWebService", () => {
  CRUDWebServiceTest("domains", DomainWebService, domainSchema);

  describe("Success cases", () => {
    beforeAll(() => {
      DomainWebService.initialize({
        baseURL: "http://localhost:3000/test_url",
        clientId: "test",
        clientSecret: "test"
      });
      const mock = new MockAdapter((DomainWebService.getInstance() as any).http.client);

      mock.onGet(`/domains/root`).reply(200, domainSchema);
      mock.onGet(`/domains/${domainSchema.id}/users`).reply(200, domainSchema.users);
      mock.onGet(`/domains/${domainSchema.id}/consumers`).reply(200, domainSchema.users);
      mock.onGet(`/domains/${domainSchema.id}/mediators`).reply(200, domainSchema.users);
    });

    it("should find the root domain", async () => {
      const root = await DomainWebService.getInstance().findRootDomain();

      expect(root).toEqual(domainSchema);
    });

    it("should find the mediators", async () => {
      const mediators = await DomainWebService.getInstance().findConsumersById(domainSchema.id);

      expect(mediators.length).toBe(domainSchema.users.length);
      expect(mediators[0]).toEqual(domainSchema.users[0]);
    });

    it("should find the consumers", async () => {
      const consumers = await DomainWebService.getInstance().findMediatorsById(domainSchema.id);

      expect(consumers.length).toBe(domainSchema.users.length);
      expect(consumers[0]).toEqual(domainSchema.users[0]);
    });
  });

  describe("Fail cases", () => {
    beforeAll(() => {
      DomainWebService.initialize({
        baseURL: "http://localhost:3000/test_url"
      });
      const mock = new MockAdapter((DomainWebService.getInstance() as any).http.client);

      mock.onGet(`/domains/root`).reply(500);
      mock.onGet(`/domains/${domainSchema.id}/users`).reply(500);
      mock.onGet(`/domains/${domainSchema.id}/consumers`).reply(500);
      mock.onGet(`/domains/${domainSchema.id}/mediators`).reply(500);
    });

    it("should fail to find the root domain", async () => {
      expect.assertions(1);
      return expect(DomainWebService.getInstance().findRootDomain()).rejects.toBeTruthy();
    });

    it("should fail to find the mediators", async () => {
      expect.assertions(1);
      return expect(DomainWebService.getInstance().findConsumersById(domainSchema.id)).rejects.toBeTruthy();
    });

    it("should fail to find the consumers", async () => {
      expect.assertions(1);
      return expect(DomainWebService.getInstance().findMediatorsById(domainSchema.id)).rejects.toBeTruthy();
    });
  });
});
