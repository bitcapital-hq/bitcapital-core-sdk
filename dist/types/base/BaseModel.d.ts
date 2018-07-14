export interface BaseModelSchema {
    id?: string;
    _id?: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}
export default class BaseModel {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    constructor(data: any);
}
