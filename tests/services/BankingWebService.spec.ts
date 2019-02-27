import { BankingWebService } from "../../lib";
import { TEST_BANKING } from "../models/Banking/Banking.test";
import { TEST_USER } from "../models/User/User.test";
import MockAdapter from "axios-mock-adapter";
import * as uuid from "uuid/v4";

const userSchema = TEST_USER({ consumer: true, credentials: false });
const bankingSchema = TEST_BANKING();

describe("lib.services.BankingWebService", () => {
  describe("Success cases", () => {
    beforeAll(() => {
      BankingWebService.initialize({
        baseURL: "http://localhost:3000/test_url",
        clientId: "test",
        clientSecret: "test"
      });
      const mock = new MockAdapter((BankingWebService.getInstance() as any).http.client);

      mock.onGet(`/consumer/${userSchema.id}/bankings`).reply(200, [bankingSchema, bankingSchema, bankingSchema]);
      mock.onGet(`/consumer/${userSchema.id}/bankings/${bankingSchema.id}`).reply(200, bankingSchema);

      mock.onPost(`/consumer/${userSchema.id}/bankings`).reply(200, bankingSchema);
      mock.onPost(`/consumer/${userSchema.id}/bankings/${bankingSchema.id}`).reply(200, bankingSchema);
      mock.onDelete(`/consumer/${userSchema.id}/bankings/${bankingSchema.id}`).reply(200, true);
    });

    it("should find bank accounts associated with the given user id id", async () => {
      const response = await BankingWebService.getInstance().findAll(userSchema.id, {});
      expect(response.length).toBe(3);
      expect(response[0]).toEqual(bankingSchema);
    });

    it("should find one bank account", async () => {
      const response = await BankingWebService.getInstance().findOneById(userSchema.id, bankingSchema.id);

      expect(response).toEqual(bankingSchema);
    });

    it("should create bank account", async () => {
      const response = await BankingWebService.getInstance().create(userSchema.id, bankingSchema);

      expect(response).toEqual(bankingSchema);
    });

    it("should delete bank account", async () => {
      const response = await BankingWebService.getInstance().delete(userSchema.id, bankingSchema.id);

      expect(response).toBe(true);
    });
  });

  describe("Fail cases", () => {
    const fakeBankingId = uuid();
    const fakeUserId = uuid();

    beforeAll(() => {
      BankingWebService.initialize({
        baseURL: "http://localhost:3000/test_url",
        clientId: "test",
        clientSecret: "test"
      });
      const mock = new MockAdapter((BankingWebService.getInstance() as any).http.client);

      mock.onGet(`/consumer/${userSchema.id}/bankings/${fakeBankingId}`).reply(404);
      mock.onPost(`/consumer/${userSchema.id}/bankings`, bankingSchema).reply(200, bankingSchema);
      mock.onPost(`/consumer/${fakeUserId}/bankings`, bankingSchema).reply(400);
      mock.onPost(`/consumer/${userSchema.id}/bankings/${bankingSchema.id}`, bankingSchema).reply(200, bankingSchema);
      mock.onPost(`/consumer/${userSchema.id}/bankings/${fakeBankingId}`, bankingSchema).reply(404);
      mock.onDelete(`/consumer/${userSchema.id}/bankings/${bankingSchema.id}`).reply(200);
      mock.onDelete(`/consumer/${userSchema.id}/bankings/${fakeBankingId}`).reply(404);
    });

    it("should fail to find bank account whose id does not exist", async () => {
      expect.assertions(1);
      return expect(BankingWebService.getInstance().findOneById(userSchema.id, fakeBankingId)).rejects.toBeTruthy();
    });

    it("should fail to create bank account whose user id does not exist", async () => {
      expect.assertions(1);
      return expect(BankingWebService.getInstance().create(fakeUserId, bankingSchema)).rejects.toBeTruthy();
    });

    it("should fail to update bank account whose user id does not exist", async () => {
      expect.assertions(1);
      return expect(
        BankingWebService.getInstance().update(userSchema.id, fakeBankingId, bankingSchema)
      ).rejects.toBeTruthy();
    });

    it("should fail to delete bank account whose user id does not exist", async () => {
      expect.assertions(1);
      return expect(BankingWebService.getInstance().delete(userSchema.id, fakeBankingId)).rejects.toBeTruthy();
    });
  });
});
