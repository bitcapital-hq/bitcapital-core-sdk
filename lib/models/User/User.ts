import BaseModel, { BaseModelSchema } from "../Base/BaseModel";
import { OAuthCredentials, Domain, Consumer } from "..";

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
  virtual: boolean;
}

export default class User extends BaseModel implements UserSchema {
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  password?: string;
  credentials?: OAuthCredentials;
  domain: Domain;
  consumer?: Consumer;
  virtual: boolean;

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
