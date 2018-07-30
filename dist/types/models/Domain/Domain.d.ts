import { BaseModel, BaseModelSchema, User } from "..";
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
    constructor(data: Partial<DomainSchema>);
}
