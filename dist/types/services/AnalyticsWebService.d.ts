import { Session } from '../session';
import { Http, HttpOptions } from '../base';
import { AnalyticsActiveResponse, AnalyticsDevicesResponse } from './response';
export interface AnalyticsWebServiceOptions extends HttpOptions {
    session?: Session;
}
export default class AnalyticsWebService extends Http {
    protected options: AnalyticsWebServiceOptions;
    protected static instance: AnalyticsWebService;
    constructor(options: AnalyticsWebServiceOptions);
    static getInstance(options: AnalyticsWebServiceOptions): AnalyticsWebService;
    /**
     * Gets analytics for the currently active tokens.
     */
    active(query?: any): Promise<AnalyticsActiveResponse>;
    /**
     * Gets device analytics from recent tokens.
     */
    devices(query?: any): Promise<AnalyticsDevicesResponse>;
}
