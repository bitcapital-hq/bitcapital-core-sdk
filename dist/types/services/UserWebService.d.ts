import { Http, HttpOptions } from "../base";
import { User, UserSchema, OAuthCredentials } from "../models";
import { PaginatedArray, Pagination } from "../utils";
import BaseModelWebService from "./base/BaseModelWebService";
export default class UserWebService implements BaseModelWebService<User, UserSchema> {
    protected http: Http;
    protected static instance: UserWebService;
    constructor(options: HttpOptions);
    static getInstance(): UserWebService;
    static initialize(options: HttpOptions): UserWebService;
    /**
     * Find all {#User}s.
     */
    findAll(pagination: Pagination): Promise<PaginatedArray<User>>;
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
     * Upsert (Update or Insert) a {#User}.
     *
     * @param consumer The values you want to upsert
     */
    upsert(user: UserSchema): Promise<User>;
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
