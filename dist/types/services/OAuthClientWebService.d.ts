import { Session } from '../session';
import { Http, HttpOptions } from '../base';
import { OAuthClient, OAuthClientSchema } from '../models';
import { PaginatedArray } from '../utils';
export interface OAuthClientWebServiceOptions extends HttpOptions {
    session?: Session;
}
export default class OAuthClientWebService extends Http {
    protected options: OAuthClientWebServiceOptions;
    protected static instance: OAuthClientWebService;
    constructor(options: OAuthClientWebServiceOptions);
    static getInstance(options: OAuthClientWebServiceOptions): OAuthClientWebService;
    /**
     * Finds {#OAuthClient} with a given query
     * @param query The query of the search
     */
    find(query?: any): Promise<PaginatedArray<OAuthClient>>;
    /**
     * Find a {#OAuthClient} by giving it's ID
     * @param id The id of the {#OAuthClient}.
     */
    findById(id: string): Promise<OAuthClient>;
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
    deleteById(id: string): Promise<boolean>;
}
