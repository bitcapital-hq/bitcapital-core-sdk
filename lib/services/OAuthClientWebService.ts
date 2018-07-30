import { Session } from "../session";
import { Http, HttpOptions } from "../base";
import { OAuthClient, OAuthClientSchema } from "../models";
import { PaginationUtil, PaginatedArray, Pagination } from "../utils";
import BaseModelWebService from "./base/BaseModelWebService";

export interface OAuthClientWebServiceOptions extends HttpOptions {
  session?: Session;
}

export default class OAuthClientWebService implements BaseModelWebService<OAuthClient, OAuthClientSchema> {
  protected options: OAuthClientWebServiceOptions;
  protected http: Http;
  protected static instance: OAuthClientWebService;

  constructor(options: OAuthClientWebServiceOptions) {
    this.http = new Http(options);

    if (options.session) {
      this.http.interceptors(options.session.interceptors());
    }
  }

  public static getInstance(): OAuthClientWebService {
    return this.instance;
  }

  public static initialize(options: OAuthClientWebServiceOptions): OAuthClientWebService {
    this.instance = new OAuthClientWebService(options);
    return this.instance;
  }

  /**
   * Finds {#OAuthClient} with a given query
   * @param query The query of the search
   */
  public async findAll(pagination: Pagination): Promise<PaginatedArray<OAuthClient>> {
    const { skip, limit } = pagination;
    const response = await this.http.get("/clients", null, { params: { skip, limit } });

    if (!response || response.status !== 200) {
      throw response;
    }

    // Return a paginated array with count information from headers
    const result = response.data.map((client: any) => new OAuthClient(client));
    return PaginationUtil.parse(result, response.headers);
  }

  /**
   * Find a {#OAuthClient} by giving it's ID
   * @param id The id of the {#OAuthClient}.
   */
  public async findOne(id: string): Promise<OAuthClient> {
    const response = await this.http.get(`/clients/${id}`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new OAuthClient(response.data);
  }

  /**
   * Creates a new {#OAuthClient}.
   * @param client The {#OAuthClient}. properties
   */
  public async create(client: OAuthClientSchema): Promise<OAuthClient> {
    const response = await this.http.post("/clients", new OAuthClient(client));

    if (!response || response.status !== 200) {
      throw response;
    }

    return new OAuthClient(response.data);
  }

  /**
   * Updates an existing {#OAuthClient}.
   *
   * @param id the id of the {#OAuthClient}
   * @param client The values you want to update
   */
  public async update(id: string, client: OAuthClientSchema): Promise<OAuthClient> {
    const response = await this.http.put(`/clients/${id}`, client);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new OAuthClient({ ...response.data });
  }

  /**
   * Deletes a given {#OAuthClient}.
   * @param id The id of the client
   */
  public async delete(id: string): Promise<boolean> {
    const response = await this.http.delete(`/users/${id}`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return true;
  }
}
