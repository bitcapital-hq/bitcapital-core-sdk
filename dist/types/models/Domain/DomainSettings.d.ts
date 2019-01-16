import { DomainSettingsLocks } from ".";
export interface DomainSettingsSchema {
    logo?: string;
    primaryColor?: string;
    tintColor?: string;
    locks: DomainSettingsLocks;
}
export declare class DomainSettings implements DomainSettingsSchema {
    logo?: string;
    primaryColor?: string;
    tintColor?: string;
    locks: DomainSettingsLocks;
    constructor(data?: Partial<DomainSettings>);
}
