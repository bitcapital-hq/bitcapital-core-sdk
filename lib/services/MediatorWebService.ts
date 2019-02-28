import { User, UserSchema, Http } from "bitcapital-common";
import { BaseModelWebServiceOptions } from "./base";

export interface MediatorWebServiceOptions extends BaseModelWebServiceOptions {}

export class MediatorWebService {
  protected http: Http;
  protected static instance: MediatorWebService;

  constructor(protected readonly options: BaseModelWebServiceOptions) {
    this.http = new Http(options);

    if (options.session) {
      this.http.interceptors(options.session.interceptors());
    }
  }

  public static getInstance(): MediatorWebService {
    return this.instance;
  }

  public static initialize(options: MediatorWebServiceOptions): MediatorWebService {
    this.instance = new MediatorWebService(options);
    return this.instance;
  }

  /**
   * Create a new Mediator.
   *
   * @param consumer The Mediator schema.
   */
  public async create(user: UserSchema): Promise<User> {
    const response = await this.http.post(`/mediators`, user);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new User(response.data);
  }
}
