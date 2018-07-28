export interface BaseModelSchema {
  id?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export default abstract class BaseModel {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: any) {
    this.id = data.id;

    if (data.createdAt) {
      this.createdAt = new Date(data.createdAt);
    }
    if (data.updatedAt) {
      this.updatedAt = new Date(data.createdAt);
    }
  }
}
