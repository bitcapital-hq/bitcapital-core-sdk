import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { HttpInterceptor } from '../../base';
import Session from '../Session';

export default class SessionCredentialsInterceptor implements HttpInterceptor {
  session: Session;

  constructor(session: Session) {
    this.session = session;
  }

  public async request(request: AxiosRequestConfig) {
    const credentials = this.session.current ? this.session.current.credentials : undefined;

    if (credentials && !request.headers['Authorization']) {
      request.headers['Authorization'] = `Bearer ${credentials.accessToken}`;
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
