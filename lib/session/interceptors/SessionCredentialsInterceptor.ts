import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import Session from "../Session";
import { HttpInterceptor } from "bitcapital-common";

export default class SessionCredentialsInterceptor implements HttpInterceptor {
  session: Session;

  constructor(session: Session) {
    this.session = session;
  }

  public async request(request: AxiosRequestConfig) {
    const credentials = this.session.current ? this.session.current.credentials : undefined;

    if (credentials && !request.headers["Authorization"]) {
      request.headers["Authorization"] = `Bearer ${credentials.accessToken}`;
    }
    return request;
  }

  public async response(response: AxiosResponse) {
    return response;
  }

  public async error(error: AxiosError) {
    return error;
  }
}
