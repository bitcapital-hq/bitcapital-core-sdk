import { BaseModelWebServiceOptions, BaseModelWebService } from ".";
import { RequestUtil } from "..";
import { PhoneCredit, PhoneCreditSchema, PhoneCreditDealers } from "bitcapital-common";

export interface PhoneCreditWebServiceOptions extends BaseModelWebServiceOptions {}

export class PhoneCreditWebService extends BaseModelWebService<PhoneCredit, PhoneCreditSchema> {
  protected static instance: PhoneCreditWebService;

  constructor(options: PhoneCreditWebServiceOptions) {
    super(options);
  }

  public static getInstance(): PhoneCreditWebService {
    return this.instance;
  }

  public static initialize(options: PhoneCreditWebServiceOptions): PhoneCreditWebService {
    this.instance = new PhoneCreditWebService(options);
    return this.instance;
  }

  public findOne(id: string, resourceId?: string): Promise<PhoneCredit> {
    id.toLowerCase;
    resourceId.toLowerCase;
    throw new Error("Method not implemented.");
  }

  public async getPhoneCreditProviders(): Promise<PhoneCreditDealers> {
    const url = `/phone-credits/providers`;
    const signature = RequestUtil.sign(this.options.clientSecret, {
      url,
      method: "GET"
    });
    const response = await this.http.get(url, {}, { headers: { ...signature } });

    if (!response || response.status !== 200) {
      throw response;
    }

    return new PhoneCreditDealers(response.data);
  }

  public async getPhoneCreditOrderHistoryForWallet(walletId: String): Promise<PhoneCredit[]> {
    const url = `/phone-credits/order/history/${walletId}`;
    const signature = RequestUtil.sign(this.options.clientSecret, {
      url,
      method: "GET"
    });
    const response = await this.http.get(url, {}, { headers: { ...signature } });

    if (!response || response.status !== 200) {
      throw response;
    }

    return response.data;
  }

  public async createOrder(phoneCode: string, phoneNumber: string, providerCode: string): Promise<PhoneCredit> {
    const payload = { phoneCode, phoneNumber, providerCode };

    const url = `/phone-credits/order/create`;
    const signature = RequestUtil.sign(this.options.clientSecret, {
      url,
      body: JSON.stringify(payload),
      method: "POST"
    });
    const response = await this.http.post(url, payload, { headers: { ...signature } });

    if (!response || response.status !== 200) {
      throw response;
    }

    return new PhoneCredit(response.data);
  }

  public async completeOrder(amount: String, sourceWalletId: String, phoneCreditOrderId: string): Promise<PhoneCredit> {
    const payload = { amount, source: sourceWalletId };

    const url = `/phone-credits/order/${phoneCreditOrderId}/complete`;
    const signature = RequestUtil.sign(this.options.clientSecret, {
      url,
      body: JSON.stringify(payload),
      method: "POST"
    });
    const response = await this.http.post(url, payload, { headers: { ...signature } });

    if (!response || response.status !== 200) {
      throw response;
    }

    return new PhoneCredit(response.data);
  }
}
