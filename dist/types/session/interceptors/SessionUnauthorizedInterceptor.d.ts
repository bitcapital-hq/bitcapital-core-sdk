import { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import { HttpInterceptor } from "bitcapital-common";
import Session from "../Session";
export declare type SessionUnauthorizedCallback = (error: AxiosError | AxiosResponse) => any;
export default class SessionUnauthorizedInterceptor implements HttpInterceptor {
    errorCodes: number[];
    onUnauthorizedStatus: SessionUnauthorizedCallback;
    session: Session;
    constructor(session: Session, onUnauthorizedStatus: SessionUnauthorizedCallback, errorCodes?: number[]);
    request(request: AxiosRequestConfig): Promise<AxiosRequestConfig>;
    response(response: AxiosResponse): Promise<any>;
    error(error: AxiosError): Promise<any>;
}
