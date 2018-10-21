export interface RequestSigningHeaders {
    "X-Request-Signature": string;
    "X-Request-Timestamp": string;
}
export interface RequestSigningOptions {
    method: string;
    url: string;
    body?: string;
    timestamp?: string;
}
export default class RequestUtil {
    /**
     * Generates headers for request signing.
     */
    static sign(secret: string, req: RequestSigningOptions): RequestSigningHeaders;
}
