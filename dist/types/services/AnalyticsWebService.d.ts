import { Http, HttpOptions } from "../base";
import { AnalyticsActiveResponse, AnalyticsDevicesResponse } from "./response";
export default class AnalyticsWebService {
    protected http: Http;
    protected static instance: AnalyticsWebService;
    constructor(options: HttpOptions);
    static getInstance(): AnalyticsWebService;
    static initialize(options: HttpOptions): AnalyticsWebService;
    /**
     * Gets analytics for the currently active tokens.
     */
    active(query?: any): Promise<AnalyticsActiveResponse>;
    /**
     * Gets device analytics from recent tokens.
     */
    devices(query?: any): Promise<AnalyticsDevicesResponse>;
}
