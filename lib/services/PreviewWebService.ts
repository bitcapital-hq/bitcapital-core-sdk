import { BaseModelWebServiceOptions } from ".";
import { RequestUtil } from "..";
import { Http } from "bitcapital-common";

export interface PreviewWebServiceOptions extends BaseModelWebServiceOptions {}

export class PreviewWebService {
  protected static instance: PreviewWebService;
  protected http: Http;

  constructor(protected readonly options: BaseModelWebServiceOptions) {
    this.http = new Http(options);

    if (options.session) {
      this.http.interceptors(options.session.interceptors());
    }
  }

  public static getInstance(): PreviewWebService {
    return this.instance;
  }

  public static initialize(options: PreviewWebServiceOptions): PreviewWebService {
    this.instance = new PreviewWebService(options);
    return this.instance;
  }

  public findOne(id: string, resourceId?: string) {
    id.toLowerCase;
    resourceId.toLowerCase;
    throw new Error("Method not implemented.");
  }

  public async kyc(taxId: string) {
    const payload = {};

    const url = `/preview/kyc/${taxId}`;
    const signature = RequestUtil.sign(this.options.clientSecret, {
      url,
      body: JSON.stringify(payload),
      method: "GET"
    });
    const response = await this.http.post(url, payload, { headers: { ...signature } });

    if (!response || response.status !== 200) {
      throw response;
    }

    return response.data;
  }
}
