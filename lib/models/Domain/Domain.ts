import { BaseModel, BaseModelSchema, User } from "..";
import { IsNotEmpty, IsEnum, IsAlphanumeric, IsFQDN } from "class-validator";

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
  @IsNotEmpty() name: string = undefined;

  @IsNotEmpty()
  @IsEnum(DomainRole)
  role: DomainRole = undefined;

  @IsNotEmpty()
  @IsAlphanumeric()
  slug: string = undefined;

  @IsFQDN(null, { each: true })
  urls?: string[] = undefined;

  users: User[] | null = undefined;
  settings: DomainSettings = undefined;
  test?: boolean = undefined;

  constructor(data: Partial<DomainSchema>) {
    super(data);

    // Assign all props
    Object.getOwnPropertyNames(this).map(prop => (this[prop] = data[prop]));
  }
}
