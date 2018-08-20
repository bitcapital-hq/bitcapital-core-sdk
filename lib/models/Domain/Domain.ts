import { BaseModel, BaseModelSchema, User } from "..";

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
  test?: boolean;
  urls?: string[];
  users: User[] | null;
  settings: DomainSettings;
}

export default class Domain extends BaseModel implements DomainSchema {
  name: string = undefined;
  role: DomainRole = undefined;
  slug: string = undefined;
  test?: boolean = undefined;
  urls?: string[] = undefined;
  users: User[] | null = undefined;
  settings: DomainSettings = undefined;

  constructor(data: Partial<DomainSchema>) {
    super(data);

    // Assign all props
    Object.getOwnPropertyNames(this).map(prop => (this[prop] = data[prop]));
  }
}
