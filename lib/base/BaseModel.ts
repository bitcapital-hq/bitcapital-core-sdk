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

  constructor(data: any) {
    this.id = data.id || data._id;

    if (data.createdAt) {
      this.createdAt = new Date(data.createdAt);
    }
    if (data.updatedAt) {
      this.updatedAt = new Date(data.createdAt);
    }
  }
}
