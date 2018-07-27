import { BaseModel, BaseModelSchema } from '../base';
export interface DomainSettings {
    logo?: string;
    primaryColor?: string;
    tintColor?: string;
}
export declare enum DomainRole {
    ROOT = "root",
    COMMON = "common"
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
    constructor(data: Partial<DomainSchema>);
}
