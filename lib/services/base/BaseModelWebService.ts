import { PaginatedArray, Pagination } from "../../utils";
import { BaseModel, BaseModelSchema } from "../../models";

export default abstract class BaseModelWebService<T extends BaseModel, U extends BaseModelSchema> {
  public abstract async findAll(pagination?: Pagination): Promise<PaginatedArray<T>>;
  public abstract async findOne(id: string): Promise<T>;
  public abstract async create?(schema: U): Promise<T>;
  public abstract async update(id: string, schema: Partial<U>): Promise<T>;
  public abstract async upsert?(schema: U): Promise<T>;
  public abstract async delete(id: string): Promise<boolean>;
}
