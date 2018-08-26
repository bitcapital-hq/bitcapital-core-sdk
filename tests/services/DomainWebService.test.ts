import MockAdapter from "axios-mock-adapter";
import { DomainWebService } from "../../lib";
import { TEST_DOMAIN } from "../models/Domain/Domain.test";

describe("lib.services.DomainWebService", () => {
  DomainWebService.initialize({
    baseURL: "http://localhost:3000/test_url"
  });
  const mock = new MockAdapter((DomainWebService.getInstance() as any).http.client);

  mock.onGet("/domains").reply(200, [TEST_DOMAIN, TEST_DOMAIN, TEST_DOMAIN]);
  mock.onGet("/domains/" + TEST_DOMAIN.id).reply(200, TEST_DOMAIN);

  it("should find all", async () => {
    const all = await DomainWebService.getInstance().findAll({});

    expect(all.length).toBe(3);
    expect(all[0]).toEqual(TEST_DOMAIN);
  });

  it("should find one", async () => {
    const one = await DomainWebService.getInstance().findOne(TEST_DOMAIN.id);

    expect(one).toEqual(TEST_DOMAIN);
  });
});
