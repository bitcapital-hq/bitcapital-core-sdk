import { Transaction, TransactionSchema } from "bitcapital-common";
import { BaseModelWebService, BaseModelWebServiceOptions } from "./base";

export interface TransactionWebServiceOptions extends BaseModelWebServiceOptions {}

export class TransactionWebService extends BaseModelWebService<Transaction, TransactionSchema> {
  protected static instance: TransactionWebService;

  constructor(options: TransactionWebServiceOptions) {
    super(options);
  }

  public static getInstance(): TransactionWebService {
    return this.instance;
  }

  public static initialize(options: TransactionWebServiceOptions): TransactionWebService {
    this.instance = new TransactionWebService(options);
    return this.instance;
  }

  /**
   * Find a Transaction.
   *
   * @param id The Transaction ID.
   */
  public async findOne(id: string): Promise<Transaction> {
    const response = await this.http.get(`/transactions/${id}`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Transaction(response.data);
  }
}
