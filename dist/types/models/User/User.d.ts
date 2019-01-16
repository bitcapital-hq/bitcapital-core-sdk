import { BaseModel, BaseModelSchema, OAuthCredentials, Domain, Consumer, Wallet, ConsumerSchema, WalletSchema } from "..";
export declare enum UserStatus {
    ACTIVE = "active",
    INACTIVE = "inactive"
}
export declare enum UserRole {
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
    credentials?: OAuthCredentials;
    domain?: Domain;
    consumer?: ConsumerSchema;
    virtual?: boolean;
    wallets?: WalletSchema[];
}
export declare class User extends BaseModel implements UserSchema {
    firstName: string;
    lastName: string;
    email: string;
    role?: UserRole;
    status?: UserStatus;
    domain?: Domain;
    password?: string;
    consumer?: Consumer;
    wallets?: Wallet[];
    credentials?: OAuthCredentials;
    virtual: boolean;
    constructor(data: Partial<UserSchema>);
    readonly name: string;
}
