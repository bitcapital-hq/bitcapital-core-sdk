export default class OAuthPasswordRequest {
    grant_type: string;
    username: string;
    password: string;
    constructor(username: string, password: string);
}
