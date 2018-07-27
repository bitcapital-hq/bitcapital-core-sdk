import { BaseModel, BaseModelSchema } from '../base';
import OAuthCredentials from './OAuthCredentials';
import Domain from './Domain';
export declare enum UserStatus {
    ACTIVE = "active",
    INACTIVE = "inactive"
}
export declare enum UserRole {
    ROOT = "root",
    USER = "user"
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
    domain: Domain;
    ownedDomain?: Domain;
}
export default class User extends BaseModel implements UserSchema {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    role: UserRole;
    status?: UserStatus;
    virtual?: boolean;
    credentials?: OAuthCredentials;
    domain: Domain;
    ownedDomain?: Domain;
    constructor(data: Partial<UserSchema>);
    name: string;
}
