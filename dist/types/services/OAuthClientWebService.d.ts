import { Http, HttpOptions } from "../base";
import { OAuthClient, OAuthClientSchema } from "../models";
import { PaginatedArray, Pagination } from "../utils";
import BaseModelWebService from "./base/BaseModelWebService";
export default class OAuthClientWebService implements BaseModelWebService<OAuthClient, OAuthClientSchema> {
    protected http: Http;
    protected static instance: OAuthClientWebService;
    constructor(options: HttpOptions);
    static getInstance(): OAuthClientWebService;
    static initialize(options: HttpOptions): OAuthClientWebService;
    /**
     * Finds {#OAuthClient} with a given query
     * @param query The query of the search
     */
    findAll(pagination: Pagination): Promise<PaginatedArray<OAuthClient>>;
    /**
     * Find a {#OAuthClient} by giving it's ID
     * @param id The id of the {#OAuthClient}.
     */
    findOne(id: string): Promise<OAuthClient>;
    /**
     * Creates a new {#OAuthClient}.
     * @param client The {#OAuthClient}. properties
     */
    create(client: OAuthClientSchema): Promise<OAuthClient>;
    /**
     * Updates an existing {#OAuthClient}.
     *
     * @param id the id of the {#OAuthClient}
     * @param client The values you want to update
     */
    update(id: string, client: OAuthClientSchema): Promise<OAuthClient>;
    /**
     * Deletes a given {#OAuthClient}.
     * @param id The id of the client
     */
    delete(id: string): Promise<boolean>;
}
