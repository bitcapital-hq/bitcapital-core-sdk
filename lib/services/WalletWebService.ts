import {
  Wallet,
  WalletSchema,
  Transaction,
  TransactionSchema,
  Pagination,
  PaginatedArray,
  PaginationUtil
} from "bitcapital-common";
import { BaseModelWebService, BaseModelWebServiceOptions } from "./base";
import { WalletTransferRequest, WalletWithdrawRequest } from "./request";

export interface WalletWebServiceOptions extends BaseModelWebServiceOptions {}

export class WalletWebService extends BaseModelWebService<Wallet, WalletSchema> {
  protected static instance: WalletWebService;

  constructor(options: WalletWebServiceOptions) {
    super(options);
  }

  public static getInstance(): WalletWebService {
    return this.instance;
  }

  public static initialize(options: WalletWebServiceOptions): WalletWebService {
    this.instance = new WalletWebService(options);
    return this.instance;
  }

  /**
   * Find all Wallets.
   */
  public async findAll(pagination: Pagination): Promise<PaginatedArray<Wallet>> {
    const { skip, limit } = pagination;
    const response = await this.http.get("/wallets", null, { params: { skip, limit } });

    if (!response || response.status !== 200) {
      throw response;
    }

    // Return a paginated array with count information from headers
    const result = response.data.map((item: WalletSchema) => new Wallet(item));
    return PaginationUtil.parse(result, response.headers);
  }

  /**
   * Find a Wallet.
   *
   * @param id The Wallet ID.
   */
  public async findOne(id: string): Promise<Wallet> {
    const response = await this.http.get(`/wallets/${id}`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Wallet(response.data);
  }

  /**
   * Find the Transactions from a Wallet.
   *
   * @param id The Wallet ID.
   */
  public async findWalletTransactions(id: string, pagination: Pagination): Promise<PaginatedArray<Transaction>> {
    const { skip, limit } = pagination;
    const response = await this.http.get(`/wallets/${id}/transactions`, null, { params: { skip, limit } });

    if (!response || response.status !== 200) {
      throw response;
    }

    // Return a paginated array with count information from headers
    const result = response.data.map((item: TransactionSchema) => new Transaction(item));
    return PaginationUtil.parse(result, response.headers);
  }

  /**
   * Find the Payments from a Wallet.
   *
   * @param id The Wallet ID.
   */
  public async findWalletPayments(id: string, pagination: Pagination): Promise<PaginatedArray<Transaction>> {
    const { skip, limit } = pagination;
    const response = await this.http.get(`/wallets/${id}/payments`, null, { params: { skip, limit } });

    if (!response || response.status !== 200) {
      throw response;
    }

    // Return a paginated array with count information from headers
    const result = response.data.map((item: TransactionSchema) => new Transaction(item));
    return PaginationUtil.parse(result, response.headers);
  }

  /**
   * Find the Root Wallet.
   */
  public async findRootWallet(): Promise<Wallet> {
    const response = await this.http.get(`/wallets/root`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Wallet(response.data);
  }

  /**
   * Create a new Wallet.
   *
   * @param wallet The Wallet schema.
   */
  public async create(wallet: WalletSchema): Promise<Wallet> {
    const response = await this.http.post("/wallets", wallet);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Wallet(response.data);
  }

  /**
   * Partially update an existing Wallet.
   *
   * @param id The Wallet ID.
   * @param wallet The partial Wallet schema.
   */
  public async update(id: string, wallet: Partial<WalletSchema>): Promise<Wallet> {
    const response = await this.http.post(`/wallets/${id}`, wallet);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Wallet(response.data);
  }

  /**
   * Delete a Wallet.
   *
   * @param id The Wallet ID.
   */
  public async delete(id: string): Promise<boolean> {
    const response = await this.http.delete(`/wallets/${id}`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return true;
  }

  /**
   * Withdraw money from a Wallet.
   *
   * @param id The Wallet id.
   */
  public async withdraw(id: string, schema: WalletWithdrawRequest) {
    const response = await this.http.post(`/wallets/${id}/withdraw`, schema);

    if (!response || response.status !== 200) {
      throw response;
    }

    return response.data;
  }

  /**
   * Transfer money to a third party bank.
   *
   * @param id The Wallet id.
   */
  public async transfer(id: string, schema: WalletTransferRequest) {
    const response = await this.http.post(`/wallets/${id}/transfer`, schema);

    if (!response || response.status !== 200) {
      throw response;
    }

    return response.data;
  }
}
