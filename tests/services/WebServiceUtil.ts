import MockAdapter from "axios-mock-adapter";

export const CRUDWebServiceTest = (endpoint: string, webServiceInstance, response) => {
  describe("Success cases", () => {
    beforeAll(() => {
      webServiceInstance.initialize({
        baseURL: "http://localhost:3000/test_url"
      });
      const mock = new MockAdapter((webServiceInstance.getInstance() as any).http.client);

      mock.onGet(`/${endpoint}`).reply(200, [response, response, response]);
      mock.onGet(`/${endpoint}/${response.id}`).reply(200, response);
      mock.onPost(`/${endpoint}`).reply(200, response);
      mock.onPost(`/${endpoint}/${response.id}`).reply(200, response);
      mock.onDelete(`/${endpoint}/${response.id}`).reply(200);
    });

    it("should find all", async () => {
      const all = await webServiceInstance.getInstance().findAll({});

      expect(all.length).toBe(3);
      expect(all[0]).toEqual(response);
    });

    it("should find one", async () => {
      const one = await webServiceInstance.getInstance().findOne(response.id);

      expect(one).toEqual(response);
    });

    it("should create one", async () => {
      const one = await webServiceInstance.getInstance().create(response);

      expect(one).toEqual(response);
    });

    it("should update one", async () => {
      const one = await webServiceInstance.getInstance().update(response.id, response);

      expect(one).toEqual(response);
    });

    it("should delete one", async () => {
      const one = await webServiceInstance.getInstance().delete(response.id);

      expect(one).toEqual(true);
    });
  });

  describe("Fail cases", () => {
    beforeAll(() => {
      webServiceInstance.initialize({
        baseURL: "http://localhost:3000/test_url"
      });
      const mock = new MockAdapter((webServiceInstance.getInstance() as any).http.client);

      mock.onGet(`/${endpoint}`).reply(500, new Error());
      mock.onGet(`/${endpoint}/${response.id}`).reply(500, new Error());
      mock.onPost(`/${endpoint}`).reply(500, new Error());
      mock.onPost(`/${endpoint}/${response.id}`).reply(500, new Error());
      mock.onDelete(`/${endpoint}/${response.id}`).reply(500, new Error());
    });

    it("should fail to find all", async () => {
      expect.assertions(1);
      return expect(webServiceInstance.getInstance().findAll({})).rejects.toBeTruthy();
    });

    it("should fail to find one", async () => {
      expect.assertions(1);
      return expect(webServiceInstance.getInstance().findOne(response.id)).rejects.toBeTruthy();
    });

    it("should fail to create one", async () => {
      expect.assertions(1);
      return expect(webServiceInstance.getInstance().create(response)).rejects.toBeTruthy();
    });

    it("should fail to update one", async () => {
      expect.assertions(1);
      return expect(webServiceInstance.getInstance().update(response.id, response)).rejects.toBeTruthy();
    });

    it("should fail to delete one", async () => {
      expect.assertions(1);
      return expect(webServiceInstance.getInstance().delete(response.id)).rejects.toBeTruthy();
    });
  });
};
