import { RequestUtil } from "../utils";
import { Payment, PaymentRequestSchema, PaymentSchema, BankTransferPayment, WithdrawalRequestSchema } from "../models";
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
   * Sends a new Payment to the network, from a single source wallet splitting into multiple payment recipients.
   *
   * @param payment The Payment schema
   */
  public async pay(request: PaymentRequestSchema): Promise<Payment> {
    const { source, recipients } = request;
    const asset = request.asset ? request.asset : "";

    const url = `/payments/${asset}`;
    const body = { source, recipients };
    const signature = RequestUtil.sign(this.options.clientSecret, {
      url,
      method: "POST",
      body: JSON.stringify(body)
    });

    const response = await this.http.post(url, body, { headers: { ...signature } });

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Payment(response.data);
  }

  /**
   * Performs cashout from consumer wallet to the bank account identified by the given id
   *
   * @param bankingId The id of the bank account to be credited
   */
  public async withdraw(requestData: WithdrawalRequestSchema): Promise<BankTransferPayment> {
    const { bankingId, amount, description } = requestData;

    const payload = { amount, description };
    const url = `/payments/withdraw/${bankingId}`;
    const signature = RequestUtil.sign(this.options.clientSecret, {
      url,
      body: JSON.stringify(payload),
      method: "POST"
    });
    const response = await this.http.post(url, payload, { headers: { ...signature } });

    if (!response || response.status !== 200) {
      throw response;
    }

    return new BankTransferPayment(response.data);
  }
}
