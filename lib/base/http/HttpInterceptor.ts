import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

export interface HttpInterceptor {
  request(request: AxiosRequestConfig): Promise<AxiosRequestConfig>;
  response(response: AxiosResponse): Promise<AxiosResponse>;
  error(error: AxiosError): Promise<AxiosError>;
}
