import * as uuid from "uuid/v4";
import * as faker from "faker";
import { PhoneSchema } from "bitcapital-common";

export const TEST_PHONE = (): PhoneSchema => ({
  id: uuid(),
  number: faker.random.number(99999999).toString(),
  code: faker.random.number(99).toString(),
  // Half phones will have no extension
  extension: Math.random() > 0.5 ? faker.random.number(99).toString() : undefined,
  verifiedAt: faker.date.past()
});
