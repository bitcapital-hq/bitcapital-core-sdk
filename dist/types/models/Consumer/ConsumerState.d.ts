import { BaseModel } from "..";
import { Consumer, ConsumerStatus } from ".";
export interface ConsumerStateSchema {
    consumer: Consumer;
    status: ConsumerStatus;
    additionalData?: any;
}
export declare class ConsumerState extends BaseModel implements ConsumerStateSchema {
    consumer: Consumer;
    status: ConsumerStatus;
    additionalData?: any;
    constructor(data: Partial<ConsumerStateSchema>);
}
