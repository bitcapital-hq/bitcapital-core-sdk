import { Session } from '../session';
import { Http, HttpOptions } from '../base';
import { User, UserSchema, OAuthCredentials } from '../models';
import { PaginationUtil, PaginatedArray } from '../utils';

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
   * Finds users with a given query
   * @param query The query of the search
   */
  public async find(query: any = {}): Promise<PaginatedArray<User>> {
    const response = await this.get('/users', query);

    if (!response || response.status !== 200) {
      throw response;
    }

    // Return a paginated array with count information from headers
    const result = response.data.map((item: UserSchema) => new User(item));
    return PaginationUtil.parse(result, response.headers);
  }

  /**
   * Find a user by giving it's ID
   * @param id The id of the user
   */
  public async findById(id: string): Promise<User> {
    const response = await this.get(`/users/${id}`, {});

    if (!response || response.status !== 200) {
      throw response;
    }

    return new User(response.data);
  }

  /**
   * Creates a new user
   * @param user The user properties
   */
  public async create(user: UserSchema): Promise<User> {
    const response = await this.post('/users', new User(user));

    if (!response || response.status !== 200) {
      throw response;
    }

    return new User(response.data);

  }

  /**
   * Updates an existing {#User}.
   *
   * @param id the id of the {#User}
   * @param user The values you want to update
   */
  public async update(id: string, user: UserSchema): Promise<User> {
    const response = await this.put(`/users/${id}`, user);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new User({ ...response.data });
  }

  /**
   * Deletes a given user
   * @param id The id of the user
   */
  public async deleteById(id: string): Promise<boolean> {
    const response = await this.delete(`/users/${id}`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return true;
  }

  /**
   * Gets the current user information from API.
   *
   * @param credentials The OAuth 2.0 credentials for the request
   */
  public async me(credentials?: OAuthCredentials): Promise<User> {
    const response = await this.get('/users/me', {}, {
      // TODO: move this to an interceptor
      headers: { Authorization: credentials ? `Bearer ${credentials.accessToken}` : undefined },
    });
    return new User({ credentials, ...response.data });
  }

  /**
   * Set a new password using a secret token.
   */
  public async setPassword(token: string, password: string): Promise<void> {
    const response = await this.post('/users/password', { token, password });

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
    const response = await this.post('/users/reset', { email });

    if (!response || response.status !== 200) {
      throw response;
    }
  }
}
