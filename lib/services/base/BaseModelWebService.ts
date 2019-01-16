import { Http, HttpOptions } from "../../base";
import { BaseModel, BaseModelSchema } from "../../models";
import { Session } from "../../session";
import { PaginatedArray, Pagination } from "../../utils";

export interface BaseModelWebServiceOptions extends HttpOptions {
  session?: Session;
  clientId?: string;
  clientSecret?: string;
}

export interface BaseModelWebServiceIntf<T extends BaseModel, U extends BaseModelSchema> {
  findAll?(pagination?: Pagination): Promise<PaginatedArray<T>>;
  findOne(id: string): Promise<T>;
  create?(schema: U): Promise<T>;
  update?(id: string, schema: Partial<U>): Promise<T>;
  delete?(id: string): Promise<boolean>;
}

export abstract class BaseModelWebService<T extends BaseModel, U extends BaseModelSchema>
  implements BaseModelWebServiceIntf<T, U> {
  protected http: Http;

  constructor(protected readonly options: BaseModelWebServiceOptions) {
    this.http = new Http(options);

    if (options.session) {
      this.http.interceptors(options.session.interceptors());
    }
  }

  public abstract async findOne(id: string): Promise<T>;
}
