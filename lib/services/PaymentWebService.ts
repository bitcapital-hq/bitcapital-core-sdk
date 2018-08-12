import { Session } from "../session";
import { Http, HttpOptions } from "../base";
import { Payment, PaymentSchema } from "../models";
import BaseModelWebService from "./base/BaseModelWebService";

export default class PaymentWebService implements BaseModelWebService<Payment, PaymentSchema> {
  protected http: Http;
  protected static instance: PaymentWebService;

  constructor(options: HttpOptions) {
    this.http = new Http(options);

    if (Session.getInstance()) {
      this.http.interceptors(Session.getInstance().interceptors());
    }
  }

  public static getInstance(): PaymentWebService {
    return this.instance;
  }

  public static initialize(options: HttpOptions): PaymentWebService {
    this.instance = new PaymentWebService(options);
    return this.instance;
  }

  /**
   * Find a {#Payment} by it's id.
   *
   * @param id The id of the {#Payment}
   */
  public async findOne(id: string): Promise<Payment> {
    const response = await this.http.get(`/payments/${id}`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Payment(response.data);
  }

  /**
   * Find a {#Payment} by it's id.
   *
   * @param payment The payment to be created
   */
  public async create(payment: PaymentSchema): Promise<Payment> {
    const response = await this.http.post(`/payments`, payment);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Payment(response.data);
  }
}
