import { Payment, PaymentRequestSchema, PaymentSchema } from "../models";
import BaseModelWebService, { BaseModelWebServiceOptions } from "./base/BaseModelWebService";

export interface PaymentWebServiceOptions extends BaseModelWebServiceOptions {}

export default class PaymentWebService extends BaseModelWebService<Payment, PaymentSchema> {
  protected static instance: PaymentWebService;

  constructor(options: PaymentWebServiceOptions) {
    super(options);
  }

  public static getInstance(): PaymentWebService {
    return this.instance;
  }

  public static initialize(options: PaymentWebServiceOptions): PaymentWebService {
    this.instance = new PaymentWebService(options);
    return this.instance;
  }

  /**
   * Find a Payment.
   *
   * @param id The Payment ID.
   */
  public async findOne(id: string): Promise<Payment> {
    const response = await this.http.get(`/payments/${id}`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Payment(response.data);
  }

  /**
   * Create a Payment.
   *
   * @param payment The Payment schema
   */
  public async pay(request: PaymentRequestSchema): Promise<Payment> {
    const { source, recipients } = request;
    const asset = request.asset ? request.asset : "";

    const url = `/payments/${asset}`;
    const response = await this.http.post(url, { source, recipients });

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Payment(response.data);
  }
}
