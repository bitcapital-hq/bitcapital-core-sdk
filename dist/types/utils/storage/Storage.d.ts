import { StorageUtilEngine } from './StorageUtilEngine';
export default class StorageUtil {
    label: string;
    protected engine: StorageUtilEngine;
    constructor(label: string, engine?: StorageUtilEngine);
    /**
     * Puts a new value in the storage.
     *
     * @param key The key to set the value in storage
     * @param value The value to be stored
     */
    put(key: string, val: any): Promise<void>;
    /**
     * Gets a value from the storage.
     *
     * @param key The key to fetch from storage
     */
    get(key: string): Promise<any>;
    /**
     * Removes an item from the storage.
     *
     * @param key The key to be deleted from storage
     */
    del(key: string): Promise<void>;
    /**
     * Clears the storage.
     */
    clear(): Promise<void>;
}
