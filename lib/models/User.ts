import { BaseModel, BaseModelSchema } from '../base';
import OAuthCredentials from './OAuthCredentials';

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum UserRole {
  ROOT = 'root',
  USER = 'user',
}

export interface UserSchema extends BaseModelSchema {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role: UserRole;
  status?: UserStatus;
  virtual?: boolean;
  credentials?: OAuthCredentials;
}

export default class User extends BaseModel implements UserSchema {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role: UserRole;
  status?: UserStatus;
  virtual?: boolean = false;
  credentials?: OAuthCredentials;

  constructor(data: Partial<UserSchema>) {
    super(data);
    this.lastName = data.lastName;
    this.firstName = data.firstName;
    this.email = data.email;
    this.password = data.password;
    this.role = data.role;
    this.status = data.status;
    this.virtual = (data.credentials && data.credentials.virtual) ?
      data.credentials.virtual :
      (data.virtual || this.virtual);

    // Relationship attributes enforcing
    this.credentials = (data.credentials ? (
      data.credentials instanceof OAuthCredentials ? data.credentials : new OAuthCredentials(data.credentials)
    ) : undefined);
  }

  get name() {
    return `${this.firstName} ${this.lastName}`;
  }

  set name(_ignoredValue: string) {
    throw new Error('Name is a readonly value, you must edit "firstName" and "lastName" separately');
  }
}
