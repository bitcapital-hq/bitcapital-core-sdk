import { User, UserSchema, Http } from "bitcapital-common";
import { BaseModelWebServiceOptions } from "./base";
export interface MediatorWebServiceOptions extends BaseModelWebServiceOptions {
}
export declare class MediatorWebService {
    protected readonly options: BaseModelWebServiceOptions;
    protected http: Http;
    protected static instance: MediatorWebService;
    constructor(options: BaseModelWebServiceOptions);
    static getInstance(): MediatorWebService;
    static initialize(options: MediatorWebServiceOptions): MediatorWebService;
    /**
     * Create a new Mediator.
     *
     * @param consumer The Mediator schema.
     */
    create(user: UserSchema): Promise<User>;
}
