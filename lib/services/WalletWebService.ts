import { Wallet, WalletSchema, User, Transaction, TransactionSchema, Payment, PaymentSchema } from "../models";
import { PaginationUtil, PaginatedArray, Pagination } from "../utils";
import BaseModelWebService, { BaseModelWebServiceOptions } from "./base/BaseModelWebService";

export interface WalletWebServiceOptions extends BaseModelWebServiceOptions {}

export default class WalletWebService extends BaseModelWebService<Wallet, WalletSchema> {
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
   * Find all {#Wallet}s
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
   * Find a {#Wallet} by it's id.
   *
   * @param id The id of the {#Wallet}
   */
  public async findOne(id: string): Promise<Wallet> {
    const response = await this.http.get(`/wallets/${id}`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Wallet(response.data);
  }

  /**
   * Find the {#Wallet}'s {#Transaction}s by it's id.
   *
   * @param id The id of the {#Wallet}
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
   * Find the {#Wallet}'s {#Payment}s by it's id.
   *
   * @param id The id of the {#Wallet}
   */
  public async findWalletPayments(id: string, pagination: Pagination): Promise<PaginatedArray<Payment>> {
    const { skip, limit } = pagination;
    const response = await this.http.get(`/wallets/${id}/payments`, null, { params: { skip, limit } });

    if (!response || response.status !== 200) {
      throw response;
    }

    // Return a paginated array with count information from headers
    const result = response.data.map((item: PaymentSchema) => new Payment(item));
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
   * Find the {#User}s from a {#Wallet} by it's id.
   *
   * @param id The id of the {#Wallet}
   */
  public async findUsersById(id: string): Promise<User[]> {
    const response = await this.http.get(`/wallets/${id}/users`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return response.data.map(user => new User(user));
  }

  /**
   * Find the {#User}s with role {#Consumer} from a {#Wallet} by it's id.
   *
   * @param id The id of the {#Wallet}
   */
  public async findConsumersById(id: string): Promise<User[]> {
    const response = await this.http.get(`/wallets/${id}/consumers`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return response.data.map(user => new User(user));
  }

  /**
   * Find the {#User}s with role Mediator from a {#Wallet} by it's id.
   *
   * @param id The id of the {#Wallet}
   */
  public async findMediatorsById(id: string): Promise<User[]> {
    const response = await this.http.get(`/wallets/${id}/mediators`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return response.data.map(user => new User(user));
  }

  /**
   * Create a new {#Wallet}.
   *
   * @param wallet The {#Wallet} properties
   */
  public async create(wallet: WalletSchema): Promise<Wallet> {
    const response = await this.http.post("/wallets", wallet);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Wallet(response.data);
  }

  /**
   * Partially update an existing {#Wallet}.
   *
   * @param id the id of the {#Wallet}
   * @param wallet The values you want to update
   */
  public async update(id: string, wallet: Partial<WalletSchema>): Promise<Wallet> {
    const response = await this.http.post(`/wallets/${id}`, wallet);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Wallet(response.data);
  }

  /**
   * Delete a {#Wallet} by it's id.
   *
   * @param id The id of the {#Wallet}
   */
  public async delete(id: string): Promise<boolean> {
    const response = await this.http.delete(`/wallets/${id}`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return true;
  }
}
