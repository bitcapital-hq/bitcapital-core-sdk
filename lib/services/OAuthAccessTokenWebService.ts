import { Session } from '../session';
import { Http, HttpOptions } from '../base';
import { OAuthAccessToken } from '../models';
import { PaginationUtil, PaginatedArray } from '../utils';

export interface OAuthAccessTokenWebServiceOptions extends HttpOptions {
  session?: Session;
}

export default class OAuthAccessTokenWebService extends Http {
  protected options: OAuthAccessTokenWebServiceOptions;
  protected static instance: OAuthAccessTokenWebService;

  constructor(options: OAuthAccessTokenWebServiceOptions) {
    super(options);
    if (options.session) {
      this.interceptors(options.session.interceptors());
    }
  }

  public static getInstance(options: OAuthAccessTokenWebServiceOptions): OAuthAccessTokenWebService {
    if (!this.instance) {
      this.instance = new OAuthAccessTokenWebService(options);
    }
    return this.instance;
  }

  /**
   * Finds {#OAuthAccessToken} with a given query
   * @param query The query of the search
   */
  public async find(query: any = {}): Promise<PaginatedArray<OAuthAccessToken>> {
    const response = await this.get('/tokens', query);

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
    const response = await this.get(`/tokens`, { user });

    if (!response || response.status !== 200) {
      throw response;
    }

    return new OAuthAccessToken(response.data);
  }
}
