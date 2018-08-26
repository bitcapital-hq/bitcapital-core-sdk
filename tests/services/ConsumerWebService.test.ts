import MockAdapter from "axios-mock-adapter";
import { ConsumerWebService } from "../../lib";
import { TEST_USER } from "../models/User/User.test";

describe("lib.services.ConsumerWebService", () => {
  ConsumerWebService.initialize({
    baseURL: "http://localhost:3000/test_url"
  });
  const mock = new MockAdapter((ConsumerWebService.getInstance() as any).http.client);

  mock.onGet("/consumers").reply(200, [TEST_USER, TEST_USER, TEST_USER]);
  mock.onGet("/consumers/" + TEST_USER.id).reply(200, TEST_USER);

  it("should find all", async () => {
    const all = await ConsumerWebService.getInstance().findAll({});

    expect(all.length).toBe(3);
    expect(all[0]).toEqual(TEST_USER);
  });

  it("should find one", async () => {
    const one = await ConsumerWebService.getInstance().findOne(TEST_USER.id);

    expect(one).toEqual(TEST_USER);
  });
});
