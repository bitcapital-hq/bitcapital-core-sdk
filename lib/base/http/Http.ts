import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { HttpInterceptor } from './HttpInterceptor';

export { HttpInterceptor };
export type HttpClient = AxiosInstance;
export type HttpRequestOptions = AxiosRequestConfig;

export interface HttpOptions extends HttpRequestOptions {
  client?: HttpClient;
}

export default class Http {
  protected options: HttpOptions;
  protected client: HttpClient;

  constructor(options: HttpOptions) {
    this.options = options;
    this.client = options.client || Axios.create(options);
  }

  /**
   * Registers an array of interceptors in a single operation.
   *
   * @param interceptors The array of interceptors instances
   */
  interceptors(interceptors: HttpInterceptor[]) {
    return interceptors.map(i => this.interceptor(i));
  }

  /**
   * Registers a single interceptor in the Http service.
   *
   * @param intercetor The interceptor instance
   */
  interceptor(intercetor: HttpInterceptor) {
    // Bind interceptor methods
    this.client.interceptors.request.use(intercetor.request.bind(intercetor));
    this.client.interceptors.response.use(intercetor.response.bind(intercetor), intercetor.error.bind(intercetor));
  }

  /**
   * Performs a GET request using client.
   *
   * @param {string} url The url for the request.
   * @param {Object | string} [data] The query string data.
   * @param {Object} [options] The request options for the Axios instance.
   *
   * @returns {Promise<any>}
   */
  get(url: string, data?: Object | string, options?: HttpRequestOptions): Promise<AxiosResponse> {
    return this.client.get(url, { params: data, ...options } as any);
  }

  /**
   * Performs a POST request using client.
   *
   * @param {string} url The url for the request.
   * @param {Object | string} [data] The query string data.
   * @param {Object} [options] The request options for the Axios instance.
   *
   * @returns {Promise<any>}
   */
  post(url: string, data?: Object | string, options?: HttpRequestOptions): Promise<AxiosResponse> {
    return this.client.post(url, data, options);
  }

  /**
   * Performs a PUT request using client.
   *
   * @param {string} url The url for the request.
   * @param {Object | string} [data] The query string data.
   * @param {Object} [options] The request options for the Axios instance.
   *
   * @returns {Promise<any>}
   */
  put(url: string, data?: Object | string, options?: HttpRequestOptions): Promise<AxiosResponse> {
    return this.client.put(url, data, options);
  }

  /**
   * Performs a DELETE request using client.
   *
   * @param {string} url The url for the request.
   * @param {Object} [options] The request options for the Axios instance.
   *
   * @returns {Promise<any>}
   */
  delete(url: string, options?: HttpRequestOptions): Promise<AxiosResponse> {
    return this.client.delete(url, options);
  }
}
