import { BaseModel, BaseModelSchema } from "..";
export declare enum OAuthClientPlatform {
    ROOT = "root",
    API = "api",
    WEB = "web",
    TEST = "test"
}
export declare enum OAuthClientStatus {
    ACTIVE = "active",
    INACTIVE = "inactive"
}
export interface OAuthClientSchema extends BaseModelSchema {
    clientId: string;
    clientSecret: string;
    platform: OAuthClientPlatform;
    status: OAuthClientStatus;
    domainId?: string;
}
export declare class OAuthClient extends BaseModel implements OAuthClientSchema {
    clientId: string;
    clientSecret: string;
    platform: OAuthClientPlatform;
    status: OAuthClientStatus;
    domainId?: string;
    constructor(data: OAuthClientSchema);
}
