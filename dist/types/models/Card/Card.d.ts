import User from "../User/User";
import { BaseModel, BaseModelSchema } from "..";
export declare enum CardStatus {
    AVAIABLE = "available",
    BLOCKED = "blocked",
    CANCELLED = "cancelled"
}
export interface CardSchema extends BaseModelSchema {
    user?: User | string;
    status: string;
}
export declare class Card extends BaseModel implements CardSchema {
    user?: User | string;
    status: string;
    constructor(data: Partial<CardSchema>);
}
