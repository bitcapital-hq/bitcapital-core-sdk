import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { HttpInterceptor } from '../../base';
import Session from '../Session';
export default class SessionCredentialsInterceptor implements HttpInterceptor {
    session: Session;
    constructor(session: Session);
    request(request: AxiosRequestConfig): Promise<AxiosRequestConfig>;
    response(response: AxiosResponse): Promise<AxiosResponse<any>>;
    error(error: AxiosError): Promise<AxiosError>;
}
