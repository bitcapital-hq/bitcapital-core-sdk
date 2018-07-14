import { StorageUtilEngine } from './StorageUtilEngine';
export default class LocalStorage implements StorageUtilEngine {
    protected context: Window;
    constructor(context: Window);
    setItem(key: string, value: string): Promise<any>;
    getItem(key: string): Promise<any>;
    removeItem(key: string): Promise<void>;
    clear(): Promise<void>;
}
