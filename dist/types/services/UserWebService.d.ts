import { OAuthCredentials, User, UserRole, UserSchema } from "../models";
import { PaginatedArray, Pagination } from "../utils";
import BaseModelWebService, { BaseModelWebServiceOptions } from "./base/BaseModelWebService";
export interface UserWebServiceOptions extends BaseModelWebServiceOptions {
}
export default class UserWebService extends BaseModelWebService<User, UserSchema> {
    protected static instance: UserWebService;
    constructor(options: UserWebServiceOptions);
    static getInstance(): UserWebService;
    static initialize(options: UserWebServiceOptions): UserWebService;
    /**
     * Find all {#User}s.
     */
    findAll(pagination: Pagination, role?: UserRole): Promise<PaginatedArray<User>>;
    /**
     * Find a {#User} by it's id.
     *
     * @param id The id of the {#User}
     */
    findOne(id: string): Promise<User>;
    /**
     * Partially update an existing {#User}.
     *
     * @param id the id of the {#User}
     * @param user The values you want to update
     */
    update(id: string, user: Partial<UserSchema>): Promise<User>;
    /**
     *  Inserts a new {#User}.
     *
     * @param consumer The values you want to insert
     */
    create(user: UserSchema): Promise<User>;
    /**
     * Delete an {$User} by it's id
     *
     * @param id The id of the {#User}
     */
    delete(id: string): Promise<boolean>;
    /**
     * Gets the current {#User} information from the API.
     *
     * @param credentials The OAuth 2.0 credentials for the request
     */
    me(credentials?: OAuthCredentials): Promise<User>;
    /**
     * Set a new password using a secret token.
     */
    setPassword(token: string, password: string): Promise<void>;
    /**
     * Resets a specific account credentials based on its email.
     *
     * @param email The email to be reset
     */
    reset(email: string): Promise<void>;
}
