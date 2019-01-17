import { DomainSettings, DomainSettingsSchema } from ".";
import { BaseModel, BaseModelSchema, User, UserSchema } from "..";
export declare enum DomainRole {
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
export declare class Domain extends BaseModel implements DomainSchema {
    name: string;
    role: DomainRole;
    urls?: string[];
    postbackUrl?: string;
    test: boolean;
    users?: User[];
    settings: DomainSettings;
    constructor(data?: Partial<DomainSchema>);
}
