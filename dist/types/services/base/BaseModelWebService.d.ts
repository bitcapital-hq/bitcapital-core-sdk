import { PaginatedArray, Pagination } from "../../utils";
import { BaseModel, BaseModelSchema } from "../../models";
export default abstract class BaseModelWebService<T extends BaseModel, U extends BaseModelSchema> {
    abstract findAll?(pagination?: Pagination): Promise<PaginatedArray<T>>;
    abstract findOne(id: string): Promise<T>;
    abstract create?(schema: U): Promise<T>;
    abstract update?(id: string, schema: Partial<U>): Promise<T>;
    abstract upsert?(schema: U): Promise<T>;
    abstract delete?(id: string): Promise<boolean>;
}
