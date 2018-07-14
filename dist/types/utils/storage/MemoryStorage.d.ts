import { StorageUtilEngine } from './StorageUtilEngine';
export default class MemoryStorage implements StorageUtilEngine {
    protected data: any;
    setItem(key: string, value: string): Promise<any>;
    getItem(key: string): Promise<any>;
    removeItem(key: string): Promise<void>;
    clear(): Promise<void>;
}
