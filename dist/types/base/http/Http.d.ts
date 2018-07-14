import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { HttpInterceptor } from './HttpInterceptor';
export { HttpInterceptor };
export declare type HttpClient = AxiosInstance;
export declare type HttpRequestOptions = AxiosRequestConfig;
export interface HttpOptions extends HttpRequestOptions {
    client?: HttpClient;
}
export default class Http {
    protected options: HttpOptions;
    protected client: HttpClient;
    constructor(options: HttpOptions);
    /**
     * Registers an array of interceptors in a single operation.
     *
     * @param interceptors The array of interceptors instances
     */
    interceptors(interceptors: HttpInterceptor[]): void[];
    /**
     * Registers a single interceptor in the Http service.
     *
     * @param intercetor The interceptor instance
     */
    interceptor(intercetor: HttpInterceptor): void;
    /**
     * Performs a GET request using client.
     *
     * @param {string} url The url for the request.
     * @param {Object | string} [data] The query string data.
     * @param {Object} [options] The request options for the Axios instance.
     *
     * @returns {Promise<any>}
     */
    get(url: string, data?: Object | string, options?: HttpRequestOptions): Promise<AxiosResponse>;
    /**
     * Performs a POST request using client.
     *
     * @param {string} url The url for the request.
     * @param {Object | string} [data] The query string data.
     * @param {Object} [options] The request options for the Axios instance.
     *
     * @returns {Promise<any>}
     */
    post(url: string, data?: Object | string, options?: HttpRequestOptions): Promise<AxiosResponse>;
    /**
     * Performs a PUT request using client.
     *
     * @param {string} url The url for the request.
     * @param {Object | string} [data] The query string data.
     * @param {Object} [options] The request options for the Axios instance.
     *
     * @returns {Promise<any>}
     */
    put(url: string, data?: Object | string, options?: HttpRequestOptions): Promise<AxiosResponse>;
    /**
     * Performs a DELETE request using client.
     *
     * @param {string} url The url for the request.
     * @param {Object} [options] The request options for the Axios instance.
     *
     * @returns {Promise<any>}
     */
    delete(url: string, options?: HttpRequestOptions): Promise<AxiosResponse>;
}
