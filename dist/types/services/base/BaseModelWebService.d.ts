import { BaseModel, BaseModelSchema, Http, HttpOptions, Pagination, PaginatedArray } from "bitcapital-common";
import { Session } from "../../session";
export interface BaseModelWebServiceOptions extends HttpOptions {
    session?: Session;
    clientId?: string;
    clientSecret?: string;
}
export interface BaseModelWebServiceIntf<T extends BaseModel, U extends BaseModelSchema> {
    findAll?(pagination?: Pagination): Promise<PaginatedArray<T>>;
    findOne(id: string, resourceId?: string): Promise<T>;
    create?(schema: U): Promise<T>;
    update?(id: string, schema: Partial<U>): Promise<T>;
    delete?(id: string): Promise<boolean>;
}
export declare abstract class BaseModelWebService<T extends BaseModel, U extends BaseModelSchema> implements BaseModelWebServiceIntf<T, U> {
    protected readonly options: BaseModelWebServiceOptions;
    protected http: Http;
    constructor(options: BaseModelWebServiceOptions);
    abstract findOne(id: string, resourceId?: string): Promise<T>;
}
