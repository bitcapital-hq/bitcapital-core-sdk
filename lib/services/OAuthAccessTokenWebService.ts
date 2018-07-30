import { Session } from "../session";
import { Http, HttpOptions } from "../base";
import { OAuthAccessToken } from "../models";
import { PaginationUtil, PaginatedArray, Pagination } from "../utils";

export interface OAuthAccessTokenWebServiceOptions extends HttpOptions {
  session?: Session;
}

export default class OAuthAccessTokenWebService {
  protected options: OAuthAccessTokenWebServiceOptions;
  protected http: Http;
  protected static instance: OAuthAccessTokenWebService;

  constructor(options: OAuthAccessTokenWebServiceOptions) {
    this.http = new Http(options);

    if (options.session) {
      this.http.interceptors(options.session.interceptors());
    }
  }

  public static getInstance(): OAuthAccessTokenWebService {
    return this.instance;
  }

  public static initialize(options: OAuthAccessTokenWebServiceOptions): OAuthAccessTokenWebService {
    this.instance = new OAuthAccessTokenWebService(options);
    return this.instance;
  }

  /**
   * Finds {#OAuthAccessToken} with a given query
   * @param query The query of the search
   */
  public async findAll(pagination: Pagination): Promise<PaginatedArray<OAuthAccessToken>> {
    const { skip, limit } = pagination;
    const response = await this.http.get("/tokens", null, { params: { skip, limit } });

    if (!response || response.status !== 200) {
      throw response;
    }

    // Return a paginated array with count information from headers
    const result = response.data.map((token: any) => new OAuthAccessToken(token));
    return PaginationUtil.parse(result, response.headers);
  }

  /**
   * Find a {#OAuthAccessToken} by giving it's User ID
   * @param id The id of the {#OAuthAccessToken}.
   */
  public async findByUser(user: string): Promise<OAuthAccessToken> {
    const response = await this.http.get(`/tokens`, { user });

    if (!response || response.status !== 200) {
      throw response;
    }

    return new OAuthAccessToken(response.data);
  }
}
