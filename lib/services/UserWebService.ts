import { Session } from "../session";
import { Http, HttpOptions } from "../base";
import { User, UserSchema, OAuthCredentials } from "../models";
import { PaginationUtil, PaginatedArray, Pagination } from "../utils";
import BaseModelWebService from "./base/BaseModelWebService";

export interface UserWebServiceOptions extends HttpOptions {
  session?: Session;
}

export default class UserWebService implements BaseModelWebService<User, UserSchema> {
  protected options: UserWebServiceOptions;
  protected http: Http;
  protected static instance: UserWebService;

  constructor(options: UserWebServiceOptions) {
    this.http = new Http(options);

    if (options.session) {
      this.http.interceptors(options.session.interceptors());
    }
  }

  public static getInstance(): UserWebService {
    return this.instance;
  }

  public static initialize(options: UserWebServiceOptions): UserWebService {
    this.instance = new UserWebService(options);
    return this.instance;
  }

  /**
   * Find all {#User}s.
   */
  public async findAll(pagination: Pagination): Promise<PaginatedArray<User>> {
    const { skip, limit } = pagination;
    const response = await this.http.get("/users", null, { params: { skip, limit } });

    if (!response || response.status !== 200) {
      throw response;
    }

    // Return a paginated array with count information from headers
    const result = response.data.map((item: UserSchema) => new User(item));
    return PaginationUtil.parse(result, response.headers);
  }

  /**
   * Find a {#User} by it's id.
   *
   * @param id The id of the {#User}
   */
  public async findOne(id: string): Promise<User> {
    const response = await this.http.get(`/users/${id}`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new User(response.data);
  }

  /**
   * Partially update an existing {#User}.
   *
   * @param id the id of the {#User}
   * @param user The values you want to update
   */
  public async update(id: string, user: Partial<UserSchema>): Promise<User> {
    const response = await this.http.post(`/users/${id}`, user);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new User(response.data);
  }

  /**
   * Upsert (Update or Insert) a {#User}.
   *
   * @param consumer The values you want to upsert
   */
  public async upsert(user: UserSchema): Promise<User> {
    const response = await this.http.put(`/users`, user);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new User(response.data);
  }

  /**
   * Delete an {$User} by it's id
   *
   * @param id The id of the {#User}
   */
  public async delete(id: string): Promise<boolean> {
    const response = await this.http.delete(`/users/${id}`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return true;
  }

  /**
   * Gets the current {#User} information from the API.
   *
   * @param credentials The OAuth 2.0 credentials for the request
   */
  public async me(credentials?: OAuthCredentials): Promise<User> {
    const response = await this.http.get(
      "/users/me",
      {},
      {
        // TODO: move this to an interceptor
        headers: { Authorization: credentials ? `Bearer ${credentials.accessToken}` : undefined }
      }
    );
    return new User({ credentials, ...response.data });
  }

  /**
   * Set a new password using a secret token.
   */
  public async setPassword(token: string, password: string): Promise<void> {
    const response = await this.http.post("/users/password", { token, password });

    if (!response || response.status !== 200) {
      throw response;
    }
  }

  /**
   * Resets a specific account credentials based on its email.
   *
   * @param email The email to be reset
   */
  public async reset(email: string): Promise<void> {
    const response = await this.http.post("/users/reset", { email });

    if (!response || response.status !== 200) {
      throw response;
    }
  }
}
