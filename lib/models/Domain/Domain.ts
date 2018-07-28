import BaseModel, { BaseModelSchema } from "../Base/BaseModel";
import User from "../User/User";

export interface DomainSettings {
  logo?: string;
  primaryColor?: string;
  tintColor?: string;
}

export enum DomainRole {
  ROOT = "root",
  COMMON = "common"
}

export interface DomainSchema extends BaseModelSchema {
  name: string;
  role: DomainRole;
  slug: string;
  logo?: string;
  primaryColor?: string;
  tintColor?: string;
  urls?: string[];
  users: User[] | null;
  settings: DomainSettings;
}

export default class Domain extends BaseModel implements DomainSchema {
  name: string;
  role: DomainRole;
  slug: string;
  logo?: string;
  primaryColor?: string;
  tintColor?: string;
  urls?: string[];
  users: User[] | null;
  settings: DomainSettings;

  constructor(data: Partial<DomainSchema>) {
    super(data);

    // Assign all props
    Object.getOwnPropertyNames(this).map(prop => (this[prop] = data[prop]));
  }
}
