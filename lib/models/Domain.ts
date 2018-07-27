import { BaseModel, BaseModelSchema } from '../base';

export interface DomainSettings {
  logo?: string;
  primaryColor?: string;
  tintColor?: string;
}

export enum DomainRole {
  ROOT = 'root',
  COMMON = 'common',
}

export interface DomainSchema extends BaseModelSchema {
  name: string;
  slug: string;
  urls: string[];
  role: DomainRole;
  settings: DomainSettings;
}

export default class Domain extends BaseModel implements DomainSchema {
  name: string;
  slug: string;
  urls: string[];
  role: DomainRole;
  settings: DomainSettings;

  constructor(data: Partial<DomainSchema>) {
    super(data);
    this.name = data.name;
    this.slug = data.slug;
    this.urls = data.urls;
    this.role = data.role;
    this.settings = data.settings;
  }

}
