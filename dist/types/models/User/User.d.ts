import { BaseModel, BaseModelSchema, OAuthCredentials, Domain, Consumer } from "..";
export declare enum UserStatus {
    ACTIVE = "active",
    INACTIVE = "inactive"
}
export declare enum UserRole {
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
    constructor(data: Partial<UserSchema>);
    readonly name: string;
}
