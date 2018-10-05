import { OAuthCredentials, User, UserSchema, UserRole } from "../models";
import BaseModelWebService, { BaseModelWebServiceOptions } from "./base/BaseModelWebService";
import { Pagination, PaginatedArray } from "..";
export interface UserWebServiceOptions extends BaseModelWebServiceOptions {
}
export default class UserWebService extends BaseModelWebService<User, UserSchema> {
    protected static instance: UserWebService;
    constructor(options: UserWebServiceOptions);
    static getInstance(): UserWebService;
    static initialize(options: UserWebServiceOptions): UserWebService;
    /**
     * Find all Users by role.
     */
    findAllByRole(pagination: Pagination, role: UserRole): Promise<PaginatedArray<User>>;
    /**
     * Find an User.
     *
     * @param id The User ID.
     */
    findOne(id: string): Promise<User>;
    /**
     * Create a new User.
     *
     * @param consumer The User schema.
     */
    create(user: UserSchema): Promise<User>;
    /**
     * Partially update an existing User.
     *
     * @param id the User ID.
     * @param user The partial User schema.
     */
    update(id: string, user: Partial<UserSchema>): Promise<User>;
    /**
     * Delete an User.
     *
     * @param id The User ID.
     */
    delete(id: string): Promise<boolean>;
    /**
     * Gets the current User information from the API.
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
