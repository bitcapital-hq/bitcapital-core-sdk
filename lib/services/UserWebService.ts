import { PaginatedArray, Pagination, PaginationUtil } from "..";
import { OAuthCredentials, User, UserRole, UserSchema } from "../models";
import BaseModelWebService, { BaseModelWebServiceOptions } from "./base/BaseModelWebService";

export interface UserWebServiceOptions extends BaseModelWebServiceOptions {}

export default class UserWebService extends BaseModelWebService<User, UserSchema> {
  protected static instance: UserWebService;

  constructor(options: UserWebServiceOptions) {
    super(options);
  }

  public static getInstance(): UserWebService {
    return this.instance;
  }

  public static initialize(options: UserWebServiceOptions): UserWebService {
    this.instance = new UserWebService(options);
    return this.instance;
  }

  /**
   * Find all Users by role.
   */
  public async findAllByRole(pagination: Pagination, role: UserRole): Promise<PaginatedArray<User>> {
    const { skip, limit } = pagination;
    const response = await this.http.get(`/users/role/${role}`, null, { params: { skip, limit } });

    if (!response || response.status !== 200) {
      throw response;
    }

    // Return a paginated array with count information from headers
    const result = response.data.map((item: UserSchema) => new User(item));
    return PaginationUtil.parse(result, response.headers);
  }

  /**
   * Find an User.
   *
   * @param id The User ID.
   */
  public async findOne(id: string): Promise<User> {
    const response = await this.http.get(`/users/${id}`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new User(response.data);
  }

  /**
   * Create a new User.
   *
   * @param consumer The User schema.
   */
  public async create(user: UserSchema): Promise<User> {
    const response = await this.http.post(`/users`, user);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new User(response.data);
  }

  /**
   * Partially update an existing User.
   *
   * @param id the User ID.
   * @param user The partial User schema.
   */
  public async update(id: string, user: Partial<UserSchema>): Promise<User> {
    const response = await this.http.post(`/users/${id}`, user);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new User(response.data);
  }

  /**
   * Delete an User.
   *
   * @param id The User ID.
   */
  public async delete(id: string): Promise<boolean> {
    const response = await this.http.delete(`/users/${id}`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return true;
  }

  /**
   * Gets the current User information from the API.
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

    if (credentials && !credentials.expiresAt && response.headers["x-oauth-bearer-expiration"]) {
      credentials.expiresAt = new Date(response.headers["x-oauth-bearer-expiration"]);
    }

    if (credentials && !credentials.scope && response.headers["x-oauth-bearer-scope"]) {
      credentials.scope = response.headers["x-oauth-bearer-scope"];
    }

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
