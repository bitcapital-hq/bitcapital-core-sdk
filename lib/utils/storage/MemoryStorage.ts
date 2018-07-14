import { StorageUtilEngine } from './StorageUtilEngine';

export default class MemoryStorage implements StorageUtilEngine {
  protected data: any = {};

  async setItem(key: string, value: string): Promise<any> {
    this.data[key] = value;
    return value;
  }
  async getItem(key: string): Promise<any> {
    return this.data[key];
  }
  async removeItem(key: string): Promise<void> {
    delete this.data[key];
  }
  async clear(): Promise<void> {
    this.data = {};
  }
}
