import { DomainSettings, DomainSettingsSchema } from ".";
import { BaseModel, BaseModelSchema, User, UserSchema } from "..";
import { IsNotEmpty, IsEnum, IsFQDN, IsOptional } from "class-validator";

export enum DomainRole {
  ROOT = "root",
  COMMON = "common"
}

export interface DomainSchema extends BaseModelSchema {
  name: string;
  role: DomainRole;
  test: boolean;
  urls?: string[];
  postbackUrl?: string;
  users?: UserSchema[];
  settings: DomainSettingsSchema;
}

export class Domain extends BaseModel implements DomainSchema {
  @IsNotEmpty() name: string = undefined;

  @IsNotEmpty()
  @IsEnum(DomainRole)
  role: DomainRole = undefined;

  @IsOptional()
  @IsFQDN({}, { each: true })
  urls?: string[] = undefined;

  @IsOptional()
  @IsFQDN()
  postbackUrl?: string;

  @IsNotEmpty() test: boolean = undefined;

  users?: User[] = undefined;
  settings: DomainSettings = undefined;

  constructor(data: Partial<DomainSchema> = {}) {
    super(data);

    Object.assign(this, data);

    this.users = data.users && data.users.map(user => new User(user));
    this.settings = data.settings && new DomainSettings(data.settings);
  }
}
