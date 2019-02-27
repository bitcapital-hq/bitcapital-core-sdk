import * as uuid from "uuid/v4";
import { CardSchema, CardStatus } from "bitcapital-common";

export const TEST_CARD_AVAIABLE: CardSchema = {
  id: uuid(),
  status: CardStatus.AVAILABLE,
  virtual: true
};

export const TEST_CARD_BLOCKED: CardSchema = {
  id: uuid(),
  status: CardStatus.BLOCKED,
  virtual: true
};

export const TEST_CARD_CANCELLED: CardSchema = {
  id: uuid(),
  status: CardStatus.CANCELLED,
  virtual: true
};
