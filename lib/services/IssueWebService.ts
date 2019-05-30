import { Pagination, PaginatedArray, PaginationUtil, Issue, IssueSchema } from "bitcapital-common";
import { BaseModelWebService, BaseModelWebServiceOptions } from "./base";
import { SearchFilters } from "./request";

export interface IssueWebServiceOptions extends BaseModelWebServiceOptions {}

export class IssueWebService extends BaseModelWebService<Issue, IssueSchema> {
  protected static instance: IssueWebService;

  constructor(options: IssueWebServiceOptions) {
    super(options);
  }

  public static getInstance(): IssueWebService {
    return this.instance;
  }

  public static initialize(options: IssueWebServiceOptions): IssueWebService {
    this.instance = new IssueWebService(options);
    return this.instance;
  }

  /**
   * Search Issues with filters.
   */
  public async find(pagination: Pagination, filters: SearchFilters = {}): Promise<PaginatedArray<Issue>> {
    const { skip, limit } = pagination;
    const response = await this.http.get("/issues", null, { params: { skip, limit, ...filters } });

    if (!response || response.status !== 200) {
      throw response;
    }

    // Return a paginated array with count information from headers
    const result = response.data.map((item: IssueSchema) => new Issue(item));
    return PaginationUtil.parse(result, response.headers);
  }

  /**
   * Find an Issue.
   *
   * @param id The Issue ID.
   */
  public async findOne(id: string): Promise<Issue> {
    const response = await this.http.get(`/issues/${id}`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Issue(response.data);
  }

  /**
   * Create a new Issue in the platform.
   *
   * @param asset The Issue schema.
   */
  public async create(issue: IssueSchema): Promise<Issue> {
    const response = await this.http.post("/issues", issue);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Issue(response.data);
  }
}
