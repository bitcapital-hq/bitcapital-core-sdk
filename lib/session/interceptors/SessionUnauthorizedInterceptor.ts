import { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { HttpInterceptor } from '../../base';

export type SessionUnauthorizedCallback = (error: AxiosError | AxiosResponse) => any;

export default class SessionUnauthorizedInterceptor implements HttpInterceptor {
  errorCodes: number[];
  onUnauthorizedStatus: SessionUnauthorizedCallback;

  constructor(onUnauthorizedStatus: SessionUnauthorizedCallback, errorCodes: number[] = [401]) {
    this.onUnauthorizedStatus = onUnauthorizedStatus;
    this.errorCodes = errorCodes;
  }

  public async request(request: AxiosRequestConfig) {
    return request;
  }

  public async response(response: AxiosResponse) {
    // As axios is calling this interceptor even when the status code is 400 or higher
    // This hack is needed to actually call onUnauthorizedStatus when there's a error
    // As the error object has a different structure and the status code is inside error.response
    const actualResponse = (response as any).response || response;
    if (actualResponse && this.errorCodes.indexOf(actualResponse.status) >= 0) {
      this.onUnauthorizedStatus(actualResponse);
    }
    return actualResponse;
  }

  public async error(error: AxiosError) {
    if (error && error.response && this.errorCodes.indexOf(error.response.status) >= 0) {
      this.onUnauthorizedStatus(error);
    }
    return error;
  }
}
