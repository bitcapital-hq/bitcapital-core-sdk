import { Pagination, PaginatedArray, Alert, AlertSchema } from "bitcapital-common";
import { BaseModelWebService, BaseModelWebServiceOptions } from "./base";
export interface AlertWebServiceOptions extends BaseModelWebServiceOptions {
}
export declare class AlertWebService extends BaseModelWebService<Alert, AlertSchema> {
    protected static instance: AlertWebService;
    constructor(options: AlertWebServiceOptions);
    static getInstance(): AlertWebService;
    static initialize(options: AlertWebServiceOptions): AlertWebService;
    /**
     * Find All Alerts
     */
    findAll(pagination: Pagination): Promise<PaginatedArray<Alert>>;
    /**
     * Find an Alert.
     *
     * @param id The Alert ID.
     */
    findOne(id: string): Promise<Alert>;
    /**
     * Create a new Alert in the platform.
     *
     * @param asset The Alert schema.
     */
    create(issue: AlertSchema): Promise<Alert>;
    /**
     * Delete an Alert from the platform.
     *
     * @param id The Alert's ID.
     */
    delete(id: string): Promise<boolean>;
}
