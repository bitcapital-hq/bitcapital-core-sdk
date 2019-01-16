import { BaseModel, BaseModelSchema, OAuthCredentials, Domain, Consumer, Wallet } from "..";
import { IsNotEmpty, IsEmail, IsEnum, IsOptional } from "class-validator";
import { WalletSchema } from "../Wallet/Wallet";
import { ConsumerSchema } from "../Consumer";
import { OAuthCredentialsSchema } from "../OAuth";

export enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive"
}

export enum UserRole {
  ADMIN = "admin",
  AUDIT = "audit",
  MEDIATOR = "mediator",
  CONSUMER = "consumer",
  PUBLIC = "public"
}

export interface UserSchema extends BaseModelSchema {
  firstName: string;
  lastName: string;
  email: string;
  role?: UserRole;
  status?: UserStatus;
  password?: string;
  credentials?: OAuthCredentialsSchema;
  domain?: Domain;
  consumer?: ConsumerSchema;
  virtual?: boolean;
  wallets?: WalletSchema[];
}

export default class User extends BaseModel implements UserSchema {
  @IsNotEmpty() firstName: string = undefined;

  @IsNotEmpty() lastName: string = undefined;

  @IsNotEmpty()
  @IsEmail()
  email: string = undefined;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole = undefined;

  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus = undefined;

  @IsOptional() domain?: Domain = undefined;

  @IsOptional() password?: string = undefined;

  consumer?: Consumer = undefined;
  wallets?: Wallet[] = undefined;
  credentials?: OAuthCredentials = undefined;
  virtual: boolean = undefined;

  constructor(data: Partial<UserSchema>) {
    super(data);

    Object.assign(this, data);

    this.consumer = data.consumer && new Consumer(data.consumer);
    this.wallets = data.wallets && data.wallets.map(wallet => new Wallet(wallet));
    this.credentials = data.credentials && new OAuthCredentials(data.credentials);

    if (data.virtual === undefined && data.credentials !== undefined && data.credentials.virtual !== undefined) {
      this.virtual = data.credentials.virtual;
    }
  }

  get name() {
    return `${this.firstName} ${this.lastName}`;
  }
}
