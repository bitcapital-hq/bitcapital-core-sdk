import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import Session from "../Session";
import { HttpInterceptor } from "bitcapital-common";
export default class SessionCredentialsInterceptor implements HttpInterceptor {
    session: Session;
    constructor(session: Session);
    request(request: AxiosRequestConfig): Promise<AxiosRequestConfig>;
    response(response: AxiosResponse): Promise<AxiosResponse<any>>;
    error(error: AxiosError): Promise<AxiosError>;
}
