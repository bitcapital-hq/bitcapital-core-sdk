import User from "../User/User";
import { BaseModel, BaseModelSchema } from "..";

export enum CardStatus {
  AVAIABLE = "available",
  BLOCKED = "blocked",
  CANCELLED = "cancelled"
}

export interface CardSchema extends BaseModelSchema {
  user?: User | string;
  status: string;
}

export class Card extends BaseModel implements CardSchema {
  user?: User | string = undefined;
  status: string = undefined;

  constructor(data: Partial<CardSchema>) {
    super(data);
    Object.assign(this, data);
  }
}
