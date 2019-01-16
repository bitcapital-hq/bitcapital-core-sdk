import { ValidateNested } from "class-validator";
import { DomainSettingsLocks } from "./DomainSettingsLocks";

export interface DomainSettingsSchema {
  logo?: string;
  primaryColor?: string;
  tintColor?: string;
  locks: DomainSettingsLocks;
}

export class DomainSettings implements DomainSettingsSchema {
  logo?: string;
  primaryColor?: string;
  tintColor?: string;

  @ValidateNested() locks: DomainSettingsLocks = undefined;

  constructor(data?: Partial<DomainSettings>) {
    Object.assign(data, this);

    this.locks = data.locks && new DomainSettingsLocks(data.locks);
  }
}
