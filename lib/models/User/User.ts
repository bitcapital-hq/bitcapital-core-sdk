import { BaseModel, BaseModelSchema, OAuthCredentials, Domain, Consumer, Wallet } from "..";

export enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive"
}

export enum UserRole {
  ADMIN = "admin",
  AUDIT = "audit",
  MEDIATOR = "mediator",
  CONSUMER = "consumer"
}

export interface UserSchema extends BaseModelSchema {
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  password?: string;
  credentials?: OAuthCredentials;
  domain: Domain;
  consumer?: Consumer;
  virtual?: boolean;
  wallets?: Wallet[];
}

export default class User extends BaseModel implements UserSchema {
  firstName: string = undefined;
  lastName: string = undefined;
  email: string = undefined;
  role: UserRole = undefined;
  status: UserStatus = undefined;
  password?: string = undefined;
  credentials?: OAuthCredentials = undefined;
  domain: Domain = undefined;
  consumer?: Consumer = undefined;
  virtual: boolean = undefined;
  wallets?: Wallet[] = undefined;

  constructor(data: Partial<UserSchema>) {
    super(data);

    // Assign all props
    Object.getOwnPropertyNames(this).map(prop => (this[prop] = data[prop]));

    this.virtual =
      data.credentials && data.credentials.virtual ? data.credentials.virtual : data.virtual || this.virtual;

    // Relationship attributes enforcing
    this.credentials = data.credentials
      ? data.credentials instanceof OAuthCredentials
        ? data.credentials
        : new OAuthCredentials(data.credentials)
      : undefined;
  }

  get name() {
    return `${this.firstName} ${this.lastName}`;
  }
}
