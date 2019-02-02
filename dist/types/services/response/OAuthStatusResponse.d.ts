export interface OAuthStatusResponseSchema {
    name: string;
    version: string;
    env: string;
    uptime: number;
}
export declare class OAuthStatusResponse implements OAuthStatusResponseSchema {
    name: string;
    version: string;
    env: string;
    uptime: number;
    constructor(data: OAuthStatusResponseSchema);
}
