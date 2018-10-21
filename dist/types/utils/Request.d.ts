export interface RequestSigningHeaders {
    'X-Request-Signature': string;
    'X-Request-Timestamp': string;
}
export default class RequestUtil {
    /**
     * Generates headers for request signing.
     */
    static sign(secret: string, req: {
        method: string;
        url: string;
        body?: string;
    }): RequestSigningHeaders;
}
