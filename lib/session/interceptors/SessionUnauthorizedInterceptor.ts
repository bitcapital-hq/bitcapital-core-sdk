import Axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import { HttpInterceptor } from "bitcapital-common";
import Session from "../Session";
import { SessionCredentialsInterceptor } from ".";

export type SessionUnauthorizedCallback = (error: AxiosError | AxiosResponse) => any;

export default class SessionUnauthorizedInterceptor implements HttpInterceptor {
  errorCodes: number[];
  onUnauthorizedStatus: SessionUnauthorizedCallback;
  session: Session;

  constructor(session: Session, onUnauthorizedStatus: SessionUnauthorizedCallback, errorCodes: number[] = [401]) {
    this.onUnauthorizedStatus = onUnauthorizedStatus;
    this.errorCodes = errorCodes;
    this.session = session;
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

  public async error(error: AxiosError): Promise<AxiosError | AxiosResponse<any>> {
    const originalRequest = error.config;
    if (error && error.response && this.errorCodes.indexOf(error.response.status) >= 0 && !originalRequest["_retry"]) {
      originalRequest["_retry"] = true;
      return this.onUnauthorizedStatus(error).then(async () => {
        const credentialInterceptor = new SessionCredentialsInterceptor(this.session);
        const request = await credentialInterceptor.request(originalRequest);
        return Axios(request);
      });
    }
    throw error;
  }
}
