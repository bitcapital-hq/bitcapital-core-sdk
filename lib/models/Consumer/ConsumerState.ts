import { BaseModel } from "..";
import { Consumer, ConsumerStatus } from ".";

export interface ConsumerStateSchema {
  consumer: Consumer;
  status: ConsumerStatus;
  additionalData?: any;
}

export class ConsumerState extends BaseModel implements ConsumerStateSchema {
  consumer: Consumer;
  status: ConsumerStatus;
  additionalData?: any;

  constructor(data: Partial<ConsumerStateSchema>) {
    super(data);

    Object.assign(this, data);

    this.consumer = data.consumer && new Consumer(data.consumer);
  }
}
