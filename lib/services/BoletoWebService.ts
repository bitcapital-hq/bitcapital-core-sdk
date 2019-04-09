import {
  Boleto,
  BoletoSchema,
  BoletoEmissionRequestSchema,
  BoletoEmissionResponse,
  BoletoPaymentRequestSchema,
  BoletoPaymentResponse,
  BoletoValidateResponse,
  RequestUtil
} from "bitcapital-common";

import { BaseModelWebService, BaseModelWebServiceOptions } from "./base/BaseModelWebService";

export interface BoletoWebServiceOptions extends BaseModelWebServiceOptions {}

export class BoletoWebService extends BaseModelWebService<Boleto, BoletoSchema> {
  protected static instance: BoletoWebService;

  constructor(options: BoletoWebServiceOptions) {
    super(options);
  }

  public static getInstance(): BoletoWebService {
    return this.instance;
  }

  public static initialize(options: BoletoWebServiceOptions): BoletoWebService {
    this.instance = new BoletoWebService(options);
    return this.instance;
  }

  /**
   * Retrieves data required for boleto payment using its barcode
   *
   * @param barcode The boleto barcode
   */
  public async getPaymentInfo(barcode: string): Promise<BoletoValidateResponse> {
    const response = await this.http.get("/boleto", { params: { barcode } });

    if (!response || response.status !== 200) {
      throw response;
    }

    return new BoletoValidateResponse(response.data);
  }

  /**
   * Pays a boleto identified by his barcode using the account
   * balance of the user whose id was sent in the request body
   *
   * @param payment The Payment schema
   */
  public async pay(payload: BoletoPaymentRequestSchema): Promise<BoletoPaymentResponse> {
    const url = "/boleto/pay";
    const signature = RequestUtil.sign(this.options.clientSecret, {
      url,
      method: "POST",
      body: JSON.stringify(payload)
    });

    const response = await this.http.post(url, payload, { headers: { ...signature } });

    if (!response || response.status !== 200) {
      throw response;
    }

    return new BoletoPaymentResponse(response.data);
  }

  /**
   * Emits a boleto to enable a deposit into a specified account.
   *
   * @param payload The payload schema
   */
  public async emit(payload: BoletoEmissionRequestSchema): Promise<BoletoEmissionResponse> {
    const url = "/boleto/emit";
    const signature = RequestUtil.sign(this.options.clientSecret, {
      url,
      method: "POST",
      body: JSON.stringify(payload)
    });

    const response = await this.http.post(url, payload, { headers: { ...signature } });

    if (!response || response.status !== 200) {
      throw response;
    }

    return new BoletoEmissionResponse(response.data);
  }

  /**
   * Find a Boleto by its ID
   *
   * @param id the boleto ID
   */
  public async findOne(id: string): Promise<Boleto> {
    const response = await this.http.get(`/boleto/${id}`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Boleto(response.data);
  }
}
