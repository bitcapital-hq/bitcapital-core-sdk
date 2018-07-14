import LocalStorage from './LocalStorage';
import { StorageUtilEngine } from './StorageUtilEngine';

export default class StorageUtil {
  protected engine: StorageUtilEngine;

  constructor(public label: string, engine?: StorageUtilEngine) {
    if (engine) {
      this.engine = engine;
    } else if (!engine && typeof process === 'object') {
      require('localstorage-polyfill');
      this.engine = (global as any).localStorage;
    } else if (!engine && window && window.localStorage) {
      this.engine = new LocalStorage(window);
    } else {
      throw new Error('No storage util available');
    }

  }

  /**
   * Puts a new value in the storage.
   *
   * @param key The key to set the value in storage
   * @param value The value to be stored
   */
  public async put(key: string, val: any): Promise<void> {
    let value;
    if (val) {
      try {
        value = JSON.stringify(val);
      } catch (error) {
        // Ignore parsing error, it's not a valid JSON
        value = val;
      }
    }

    // TODO: Use obfuscation technique such as Base64
    return this.engine.setItem(key, value);
  }

  /**
   * Gets a value from the storage.
   *
   * @param key The key to fetch from storage
   */
  public async get(key: string): Promise<any> {
    const value = await this.engine.getItem(key);

    if (value) {
      try {
        return JSON.parse(value);
      } catch (error) {
        // Ignore parsing error, it's not a valid JSON
      }
    }

    // TODO: Use obfuscation technique such as Base64
    return value;
  }

  /**
   * Removes an item from the storage.
   *
   * @param key The key to be deleted from storage
   */
  public async del(key: string): Promise<void> {
    return this.engine.removeItem(key);
  }

  /**
   * Clears the storage.
   */
  public async clear(): Promise<void> {
    return this.engine.clear();
  }

}
