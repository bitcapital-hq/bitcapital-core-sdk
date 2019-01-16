import { Http, HttpOptions } from "../../base";
import { BaseModel, BaseModelSchema } from "../../models";
import { Session } from "../../session";
import { PaginatedArray, Pagination } from "../../utils";

export interface NestedModelWebServiceOptions extends HttpOptions {
  session?: Session;
  clientId?: string;
  clientSecret?: string;
}

export interface NestedModelWebServiceIntf<T extends BaseModel, U extends BaseModelSchema> {
  findAll(parentId: string, pagination?: Pagination): Promise<PaginatedArray<T>>;
  findOne(parentId: string, ownId: string): Promise<T>;
  create(parentId: string, schema: U): Promise<T>;
  update(parentId: string, ownId: string, schema: Partial<U>): Promise<T>;
  delete(parentId: string, ownId: string): Promise<boolean>;
}

export abstract class NestedModelWebService<T extends BaseModel, U extends BaseModelSchema>
  implements NestedModelWebServiceIntf<T, U> {
  protected http: Http;

  constructor(protected readonly options: NestedModelWebServiceOptions) {
    this.http = new Http(options);

    if (options.session) {
      this.http.interceptors(options.session.interceptors());
    }
  }

  public abstract async findOne(parentId: string, ownId: string): Promise<T>;
  public abstract async findAll(parentId: string, pagination?: Pagination): Promise<PaginatedArray<T>>;
  public abstract async create(parentId: string, schema: U): Promise<T>;
  public abstract async update(parentId: string, ownId: string, schema: Partial<U>): Promise<T>;
  public abstract async delete(parentId: string, ownId: string): Promise<boolean>;
}
