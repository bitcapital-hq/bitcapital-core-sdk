import { OAuthCredentials, User, UserRole, UserSchema, Pagination, PaginatedArray, Wallet } from "bitcapital-common";
import { BaseModelWebService, BaseModelWebServiceOptions } from "./base";
export interface UserWebServiceOptions extends BaseModelWebServiceOptions {
}
export declare class UserWebService extends BaseModelWebService<User, UserSchema> {
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
     * Find the Wallets from a User with role Consumer.
     *
     * @param id The User ID.
     */
    findWalletsById(id: string): Promise<Wallet[]>;
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
