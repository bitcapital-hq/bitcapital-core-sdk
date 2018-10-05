import { Http } from "../base";
import { Domain, DomainSchema, User } from "../models";
import { PaginatedArray, Pagination } from "../utils";
import BaseModelWebService, { BaseModelWebServiceOptions } from "./base/BaseModelWebService";
export interface DomainWebServiceOptions extends BaseModelWebServiceOptions {
}
export default class DomainWebService extends BaseModelWebService<Domain, DomainSchema> {
    protected http: Http;
    protected static instance: DomainWebService;
    constructor(options: DomainWebServiceOptions);
    static getInstance(): DomainWebService;
    static initialize(options: DomainWebServiceOptions): DomainWebService;
    /**
     * Find all Domains.
     */
    findAll(pagination: Pagination): Promise<PaginatedArray<Domain>>;
    /**
     * Find a Domain.
     *
     * @param id The Domain ID.
     */
    findOne(id: string): Promise<Domain>;
    /**
     * Find the Root Domain.
     */
    findRootDomain(): Promise<Domain>;
    /**
     * Find the Users with role Consumer from a Domain.
     *
     * @param id The Domain ID.
     */
    findConsumersById(id: string): Promise<User[]>;
    /**
     * Find the Users with role Mediator from a Domain.
     *
     * @param id The Domain ID.
     */
    findMediatorsById(id: string): Promise<User[]>;
    /**
     * Create a new Domain.
     *
     * @param domain The Domain schema.
     */
    create(domain: DomainSchema): Promise<Domain>;
    /**
     * Partially update an existing Domain.
     *
     * @param id The Domain ID.
     * @param domain The partial Domain schema.
     */
    update(id: string, domain: Partial<DomainSchema>): Promise<Domain>;
    /**
     * Delete a Domain.
     *
     * @param id The Domain ID.
     */
    delete(id: string): Promise<boolean>;
}
