import { Session } from "../session";
import { Http, HttpOptions } from "../base";
import { User, UserSchema, OAuthCredentials } from "../models";
import { PaginationUtil, PaginatedArray } from "../utils";

export interface UserWebServiceOptions extends HttpOptions {
  session?: Session;
}

export default class UserWebService extends Http {
  protected options: UserWebServiceOptions;
  protected static instance: UserWebService;

  constructor(options: UserWebServiceOptions) {
    super(options);
    if (options.session) {
      this.interceptors(options.session.interceptors());
    }
  }

  public static getInstance(options: UserWebServiceOptions): UserWebService {
    if (!this.instance) {
      this.instance = new UserWebService(options);
    }
    return this.instance;
  }

  /**
   * Find all {#User}s.
   */
  public async findAll(): Promise<PaginatedArray<User>> {
    const response = await this.get("/users");

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
  public async findById(id: string): Promise<User> {
    const response = await this.get(`/users/${id}`);

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
    const response = await this.post(`/users/${id}`, user);

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
    const response = await this.put(`/users`, user);

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
  public async deleteById(id: string): Promise<boolean> {
    const response = await this.delete(`/users/${id}`);

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
    const response = await this.get(
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
    const response = await this.post("/users/password", { token, password });

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
    const response = await this.post("/users/reset", { email });

    if (!response || response.status !== 200) {
      throw response;
    }
  }
}
