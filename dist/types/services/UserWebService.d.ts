import { Session } from '../session';
import { Http, HttpOptions } from '../base';
import { User, UserSchema, OAuthCredentials } from '../models';
import { PaginatedArray } from '../utils';
export interface UserWebServiceOptions extends HttpOptions {
    session?: Session;
}
export default class UserWebService extends Http {
    protected options: UserWebServiceOptions;
    protected static instance: UserWebService;
    constructor(options: UserWebServiceOptions);
    static getInstance(options: UserWebServiceOptions): UserWebService;
    /**
     * Finds users with a given query
     * @param query The query of the search
     */
    find(query?: any): Promise<PaginatedArray<User>>;
    /**
     * Find a user by giving it's ID
     * @param id The id of the user
     */
    findById(id: string): Promise<User>;
    /**
     * Creates a new user
     * @param user The user properties
     */
    create(user: UserSchema): Promise<User>;
    /**
     * Updates an existing {#User}.
     *
     * @param id the id of the {#User}
     * @param user The values you want to update
     */
    update(id: string, user: UserSchema): Promise<User>;
    /**
     * Deletes a given user
     * @param id The id of the user
     */
    deleteById(id: string): Promise<boolean>;
    /**
     * Gets the current user information from API.
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
