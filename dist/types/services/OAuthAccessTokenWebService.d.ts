import { Session } from '../session';
import { Http, HttpOptions } from '../base';
import { OAuthAccessToken } from '../models';
import { PaginatedArray } from '../utils';
export interface OAuthAccessTokenWebServiceOptions extends HttpOptions {
    session?: Session;
}
export default class OAuthAccessTokenWebService extends Http {
    protected options: OAuthAccessTokenWebServiceOptions;
    protected static instance: OAuthAccessTokenWebService;
    constructor(options: OAuthAccessTokenWebServiceOptions);
    static getInstance(options: OAuthAccessTokenWebServiceOptions): OAuthAccessTokenWebService;
    /**
     * Finds {#OAuthAccessToken} with a given query
     * @param query The query of the search
     */
    find(query?: any): Promise<PaginatedArray<OAuthAccessToken>>;
    /**
     * Find a {#OAuthAccessToken} by giving it's User ID
     * @param id The id of the {#OAuthAccessToken}.
     */
    findByUser(user: string): Promise<OAuthAccessToken>;
}
