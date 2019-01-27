import { BaseModel, BaseModelSchema, Http, HttpOptions, PaginatedArray, Pagination } from "bitcapital-common";
import { Session } from "../../session";
export interface NestedModelWebServiceOptions extends HttpOptions {
    session?: Session;
    clientId?: string;
    clientSecret?: string;
}
export interface NestedModelWebServiceIntf<T extends BaseModel, U extends BaseModelSchema> {
    findAll(parentId: string, pagination?: Pagination): Promise<PaginatedArray<T>>;
    findOne(parentId: string, ownId: string): Promise<T>;
    create(parentId: string, schema: U): Promise<T>;
    update(parentId: string, ownId: string, schema: Partial<U>): Promise<T>;
    delete(parentId: string, ownId: string): Promise<boolean>;
}
export declare abstract class NestedModelWebService<T extends BaseModel, U extends BaseModelSchema> implements NestedModelWebServiceIntf<T, U> {
    protected readonly options: NestedModelWebServiceOptions;
    protected http: Http;
    constructor(options: NestedModelWebServiceOptions);
    abstract findOne(parentId: string, ownId: string): Promise<T>;
    abstract findAll(parentId: string, pagination?: Pagination): Promise<PaginatedArray<T>>;
    abstract create(parentId: string, schema: U): Promise<T>;
    abstract update(parentId: string, ownId: string, schema: Partial<U>): Promise<T>;
    abstract delete(parentId: string, ownId: string): Promise<boolean>;
}
