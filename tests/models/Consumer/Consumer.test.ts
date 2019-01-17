import * as uuid from "uuid/v4";
import { Consumer, ConsumerSchema, Address, Document, Phone } from "../../../lib";
import * as faker from "faker";
import { TEST_ADDRESS } from "./Address.test";
import { TEST_DOCUMENT } from "./Document.test";
import { TEST_PHONE } from "./Phone.test";
import * as CPF from "cpf";

export const TEST_CONSUMER = (): ConsumerSchema => ({
  id: uuid(),
  addresses: Array.from({ length: faker.random.number(3) }, () => TEST_ADDRESS()),
  documents: Array.from({ length: faker.random.number(3) }, () => TEST_DOCUMENT()),
  phones: Array.from({ length: faker.random.number(3) }, () => TEST_PHONE()),
  taxId: CPF.generate()
});

describe("lib.models.Consumer.Consumer", () => {
  it("should instantiate a valid instance", async () => {
    const schema = TEST_CONSUMER();
    const consumer = new Consumer(schema);

    expect(consumer.id).toBe(schema.id);
    consumer.addresses.forEach(address => expect(address).toBeInstanceOf(Address));
    consumer.documents.forEach(document => expect(document).toBeInstanceOf(Document));
    consumer.phones.forEach(phone => expect(phone).toBeInstanceOf(Phone));
    expect(consumer.taxId).toBe(schema.taxId);

    expect(await consumer.isValid()).toBe(true);
  });
});
