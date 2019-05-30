import { Pagination, PaginatedArray, Issue, IssueSchema } from "bitcapital-common";
import { BaseModelWebService, BaseModelWebServiceOptions } from "./base";
import { SearchFilters } from "./request";
export interface IssueWebServiceOptions extends BaseModelWebServiceOptions {
}
export declare class IssueWebService extends BaseModelWebService<Issue, IssueSchema> {
    protected static instance: IssueWebService;
    constructor(options: IssueWebServiceOptions);
    static getInstance(): IssueWebService;
    static initialize(options: IssueWebServiceOptions): IssueWebService;
    /**
     * Search Issues with filters.
     */
    find(pagination: Pagination, filters?: SearchFilters): Promise<PaginatedArray<Issue>>;
    /**
     * Find an Issue.
     *
     * @param id The Issue ID.
     */
    findOne(id: string): Promise<Issue>;
    /**
     * Create a new Issue in the platform.
     *
     * @param asset The Issue schema.
     */
    create(issue: IssueSchema): Promise<Issue>;
}
