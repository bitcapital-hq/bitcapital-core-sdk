export default class OAuthPasswordRequest {
    grant_type: string;
    username: string;
    password: string;
    scope?: string;
    constructor(username: string, password: string, scope?: string);
}
