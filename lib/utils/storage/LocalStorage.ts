import { StorageUtilEngine } from './StorageUtilEngine';

export default class LocalStorage implements StorageUtilEngine {
  constructor(protected context: Window) {
  }

  async setItem(key: string, value: string): Promise<any> {
    return window.localStorage.setItem(key, value);
  }
  async getItem(key: string): Promise<any> {
    return window.localStorage.getItem(key);
  }
  async removeItem(key: string): Promise<void> {
    return window.localStorage.removeItem(key);
  }
  async clear(): Promise<void> {
    return window.localStorage.clear();
  }
}
