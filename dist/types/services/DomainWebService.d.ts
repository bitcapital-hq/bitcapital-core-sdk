import { Http, HttpOptions } from "../base";
import { Domain, DomainSchema, User } from "../models";
import { PaginatedArray, Pagination } from "../utils";
import BaseModelWebService from "./base/BaseModelWebService";
export default class DomainWebService implements BaseModelWebService<Domain, DomainSchema> {
    protected http: Http;
    protected static instance: DomainWebService;
    constructor(options: HttpOptions);
    static getInstance(): DomainWebService;
    static initialize(options: HttpOptions): DomainWebService;
    /**
     * Find all {#Domain}s
     */
    findAll(pagination: Pagination): Promise<PaginatedArray<Domain>>;
    /**
     * Find a {#Domain} by it's id.
     *
     * @param id The id of the {#Domain}
     */
    findOne(id: string): Promise<Domain>;
    /**
     * Find the {#User}s from a {#Domain} by it's id.
     *
     * @param id The id of the {#Domain}
     */
    findUsersById(id: string): Promise<User>;
    /**
     * Find the {#User}s with role {#Consumer} from a {#Domain} by it's id.
     *
     * @param id The id of the {#Domain}
     */
    findConsumersById(id: string): Promise<User>;
    /**
     * Find the {#User}s with role Mediator from a {#Domain} by it's id.
     *
     * @param id The id of the {#Domain}
     */
    findMediatorsById(id: string): Promise<User>;
    /**
     * Create a new {#Domain}.
     *
     * @param domain The {#Domain} properties
     */
    create(domain: DomainSchema): Promise<Domain>;
    /**
     * Partially update an existing {#Domain}.
     *
     * @param id the id of the {#Domain}
     * @param domain The values you want to update
     */
    update(id: string, domain: Partial<DomainSchema>): Promise<Domain>;
    /**
     * Upsert a {#Domain}.
     *
     * @param domain The values you want to upsert
     */
    upsert(domain: DomainSchema): Promise<Domain>;
    /**
     * Delete a {#Domain} by it's id.
     *
     * @param id The id of the {#Domain}
     */
    delete(id: string): Promise<boolean>;
}
