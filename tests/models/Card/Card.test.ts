import * as hat from "hat";
import * as uuid from "uuid/v4";
import { CardSchema, Card, CardStatus } from "../../../lib";

export const TEST_CARD_AVAIABLE: CardSchema = {
  id: uuid(),
  status: CardStatus.AVAIABLE
};

export const TEST_CARD_BLOCKED: CardSchema = {
  id: uuid(),
  status: CardStatus.BLOCKED
};

export const TEST_CARD_CANCELLED: CardSchema = {
  id: uuid(),
  status: CardStatus.CANCELLED
};

describe("lib.models.Card", () => {
  it("should instantiate properly", async () => {
    const card = new Card({ ...TEST_CARD_AVAIABLE });
    expect(await card.isValid()).toBe(true);
  });

  it("should instantiate properly", async () => {
    const card = new Card({ ...TEST_CARD_BLOCKED });
    expect(await card.isValid()).toBe(true);
  });

  it("should instantiate properly", async () => {
    const card = new Card({ ...TEST_CARD_CANCELLED });
    expect(await card.isValid()).toBe(true);
  });
});
