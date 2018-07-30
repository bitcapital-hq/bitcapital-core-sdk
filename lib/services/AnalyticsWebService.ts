import { Session } from "../session";
import { Http, HttpOptions } from "../base";
import { AnalyticsActiveResponse, AnalyticsDevicesResponse } from "./response";

export default class AnalyticsWebService {
  protected http: Http;
  protected static instance: AnalyticsWebService;

  constructor(options: HttpOptions) {
    this.http = new Http(options);

    if (Session.getInstance()) {
      this.http.interceptors(Session.getInstance().interceptors());
    }
  }

  public static getInstance(): AnalyticsWebService {
    return this.instance;
  }

  public static initialize(options: HttpOptions): AnalyticsWebService {
    this.instance = new AnalyticsWebService(options);
    return this.instance;
  }

  /**
   * Gets analytics for the currently active tokens.
   */
  public async active(query: any = {}): Promise<AnalyticsActiveResponse> {
    const response = await this.http.get("/analytics/active", query);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new AnalyticsActiveResponse(response.data);
  }

  /**
   * Gets device analytics from recent tokens.
   */
  public async devices(query: any = {}): Promise<AnalyticsDevicesResponse> {
    const response = await this.http.get("/analytics/devices", query);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new AnalyticsDevicesResponse(response.data);
  }
}
