import * as uuid from "uuid/v4";
import { Consumer, ConsumerSchema, ConsumerStatus, Address, Document, Phone, Wallet } from "../../../lib";
import { TEST_ADDRESS } from "./Address.test";
import { TEST_DOCUMENT } from "./Document.test";
import { TEST_PHONE } from "./Phone.test";

export const TEST_CONSUMER: ConsumerSchema = {
  id: uuid(),
  status: ConsumerStatus.PENDING_DOCUMENTS,
  userId: uuid(),
  addresses: [new Address(TEST_ADDRESS)],
  documents: [new Document(TEST_DOCUMENT)],
  phones: [new Phone(TEST_PHONE)]
};

describe("lib.models.Consumer.Consumer", () => {
  it("should instantiate a valid instance", async () => {
    const consumer = new Consumer({ ...TEST_CONSUMER });

    expect(consumer.status).toBe(TEST_CONSUMER.status);
    expect(consumer.userId).toBe(TEST_CONSUMER.userId);
    expect(consumer.addresses).toBe(TEST_CONSUMER.addresses);
    expect(consumer.documents).toBe(TEST_CONSUMER.documents);
    expect(consumer.phones).toBe(TEST_CONSUMER.phones);

    expect(await consumer.isValid()).toBe(true);
  });
});
