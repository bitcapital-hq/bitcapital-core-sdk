import {
  Address,
  AddressSchema,
  Document,
  DocumentSchema,
  Phone,
  PhoneSchema,
  ConsumerState,
  ConsumerStateSchema
} from ".";
import { BaseModel, BaseModelSchema, User, UserSchema } from "..";
import { IsNotEmpty } from "class-validator";

export interface ConsumerSchema extends BaseModelSchema {
  user?: UserSchema;
  documents?: DocumentSchema[];
  phones?: PhoneSchema[];
  addresses?: AddressSchema[];
  taxId: string;
  states?: ConsumerStateSchema[];
}

export class Consumer extends BaseModel implements ConsumerSchema {
  user?: User = undefined;

  @IsNotEmpty() taxId: string = undefined;

  addresses: Address[] = undefined;
  documents?: Document[] = undefined;
  phones: Phone[] = undefined;
  states?: ConsumerState[];

  constructor(data: Partial<ConsumerSchema> = {}) {
    super(data);

    Object.assign(this, data);

    this.addresses = data.addresses && data.addresses.map(address => new Address(address));
    this.documents = data.documents && data.documents.map(document => new Document(document));
    this.phones = data.phones && data.phones.map(phone => new Phone(phone));
    this.states = data.states && data.states.map(state => new ConsumerState(state));
  }
}
