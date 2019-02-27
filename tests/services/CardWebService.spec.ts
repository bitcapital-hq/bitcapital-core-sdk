import { CRUDWebServiceTest } from "./WebServiceUtil";
import MockAdapter from "axios-mock-adapter";
import * as uuid from "uuid/v4";
import { TEST_CARD_AVAIABLE, TEST_CARD_BLOCKED, TEST_CARD_CANCELLED } from "../models/Card/Card.test";
import { TEST_USER } from "../models/User/User.test";
import { CardWebService } from "../../lib";

const userSchema = TEST_USER();

describe("lib.services.CardWebService", () => {
  CRUDWebServiceTest("cards", CardWebService, TEST_CARD_AVAIABLE);

  describe("Success cases", () => {
    beforeAll(() => {
      CardWebService.initialize({
        baseURL: "http://localhost:3000/test_url",
        clientId: "test",
        clientSecret: "test"
      });
      const mock = new MockAdapter((CardWebService.getInstance() as any).http.client);

      mock.onGet(`/users/${userSchema.id}/cards/${TEST_CARD_AVAIABLE.id}`).reply(200, TEST_CARD_AVAIABLE);
      mock.onGet(`/users/${userSchema.id}/cards/${TEST_CARD_BLOCKED.id}`).reply(200, TEST_CARD_BLOCKED);
      mock.onPost(`/users/${userSchema.id}/cards/${TEST_CARD_AVAIABLE.id}/block`).reply(200, []);
      mock.onPost(`/users/${userSchema.id}/cards/${TEST_CARD_AVAIABLE.id}/unblock`).reply(200, []);
    });

    it("should find one card", async () => {
      const response = await CardWebService.getInstance().findOne(userSchema.id, TEST_CARD_AVAIABLE.id);
      expect(response).toEqual(TEST_CARD_AVAIABLE);
    });

    it("should block user card", async () => {
      const success = await CardWebService.getInstance().block(TEST_CARD_AVAIABLE.id, {
        comment: "lost card",
        password: "123456"
      });
      expect(success).toBe(true);
    });

    it("should unblock user card", async () => {
      const success = await CardWebService.getInstance().unblock(TEST_CARD_AVAIABLE.id, {
        password: "123456"
      });
      expect(success).toBe(true);
    });
  });

  describe("Fail cases", () => {
    const fakeCardId = uuid();
    beforeAll(() => {
      CardWebService.initialize({
        baseURL: "http://localhost:3000/test_url",
        clientId: "test",
        clientSecret: "test"
      });
      const mock = new MockAdapter((CardWebService.getInstance() as any).http.client);

      mock.onGet(`/users/${userSchema.id}/cards/${fakeCardId}`).reply(404);
      mock
        .onPost(`/users/${userSchema.id}/cards/${TEST_CARD_BLOCKED.id}/block`)
        .reply(400, { message: "The card is already blocked" });
      mock
        .onPost(`/users/${userSchema.id}/cards/${TEST_CARD_AVAIABLE.id}/unblock`)
        .reply(400, { message: "The card is already available" });
      mock
        .onPost(`/users/${userSchema.id}/cards/${TEST_CARD_CANCELLED.id}/block`)
        .reply(400, { message: "Card cancelled" });
      mock
        .onPost(`/users/${userSchema.id}/cards/${TEST_CARD_CANCELLED.id}/unblock`)
        .reply(400, { message: "Card cancelled" });
    });

    it("should fail to attempt to find an card ID that do not exists", async () => {
      expect.assertions(1);
      return expect(CardWebService.getInstance().findOne(userSchema.id, fakeCardId)).rejects.toBeTruthy();
    });

    it("should fail to attempt to find an card ID that do not exists", async () => {
      try {
        await CardWebService.getInstance().findOne(userSchema.id, fakeCardId);
      } catch (error) {
        expect(error.message).toMatch("404");
      }
    });

    it("should fail to attempt to block a card that is already blocked", async () => {
      expect.assertions(1);
      return expect(
        CardWebService.getInstance().block(TEST_CARD_BLOCKED.id, {
          comment: "Card lost",
          password: "123456"
        })
      ).rejects.toBeTruthy();
    });

    it("should fail to attempt to unblock an available (not blocked) card", async () => {
      expect.assertions(1);
      return expect(
        CardWebService.getInstance().unblock(TEST_CARD_AVAIABLE.id, {
          password: "123456"
        })
      ).rejects.toBeTruthy();
    });

    it("should fail to attempt to unblock a canceled card", async () => {
      expect.assertions(1);
      return expect(
        CardWebService.getInstance().unblock(TEST_CARD_CANCELLED.id, {
          password: "123456"
        })
      ).rejects.toBeTruthy();
    });
  });
});
