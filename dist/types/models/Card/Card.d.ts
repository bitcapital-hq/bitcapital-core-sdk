import User from "../User/User";
import { BaseModel, BaseModelSchema } from "..";
export interface CardSchema extends BaseModelSchema {
    user?: User | string;
}
export default class Card extends BaseModel implements CardSchema {
    user?: User | string;
    constructor(data: Partial<CardSchema>);
}
