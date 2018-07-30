import { Http, HttpOptions } from "../base";
import { User, UserSchema } from "../models";
import { PaginatedArray, Pagination } from "../utils";
import BaseModelWebService from "./base/BaseModelWebService";
export default class MediatorWebService implements BaseModelWebService<User, UserSchema> {
    protected http: Http;
    protected static instance: MediatorWebService;
    constructor(options: HttpOptions);
    static getInstance(): MediatorWebService;
    static initialize(options: HttpOptions): MediatorWebService;
    /**
     * Find all {#User} with role {#Mediator}s
     *
     * @param query The query of the search
     */
    findAll(pagination: Pagination): Promise<PaginatedArray<User>>;
    /**
     * Find a {#User} with role {#Mediator} by it's ID
     *
     * @param id The id of the mediator
     */
    findOne(id: string): Promise<User>;
    /**
     * Create a new {#User} with role {#Mediator}
     *
     * @param mediator The mediator properties
     */
    create(mediator: UserSchema): Promise<User>;
    /**
     * Partially update an existing {#User} with role {#Mediator}.
     *
     * @param id the id of the {#User} with role {#Mediator}
     * @param mediator The values you want to update
     */
    update(id: string, mediator: Partial<UserSchema>): Promise<User>;
    /**
     * Delete a {#User} with role {#Mediator} by it's id
     *
     * @param id The id of the {#User} with role {#Mediator}
     */
    delete(id: string): Promise<boolean>;
}
