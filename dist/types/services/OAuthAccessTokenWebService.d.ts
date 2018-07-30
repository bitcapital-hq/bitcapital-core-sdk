import { Http, HttpOptions } from "../base";
import { OAuthAccessToken } from "../models";
import { PaginatedArray, Pagination } from "../utils";
export default class OAuthAccessTokenWebService {
    protected http: Http;
    protected static instance: OAuthAccessTokenWebService;
    constructor(options: HttpOptions);
    static getInstance(): OAuthAccessTokenWebService;
    static initialize(options: HttpOptions): OAuthAccessTokenWebService;
    /**
     * Finds {#OAuthAccessToken} with a given query
     * @param query The query of the search
     */
    findAll(pagination: Pagination): Promise<PaginatedArray<OAuthAccessToken>>;
    /**
     * Find a {#OAuthAccessToken} by giving it's User ID
     * @param id The id of the {#OAuthAccessToken}.
     */
    findByUser(user: string): Promise<OAuthAccessToken>;
}
