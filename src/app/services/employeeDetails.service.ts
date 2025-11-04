import { Injectable } from '@angular/core';
import { LocalStorageAdapter } from './local-storage-adapter';
import { LoggerService as Logger } from './logger.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeDetailsService {
  private readonly storage: LocalStorageAdapter;

  constructor() {
    this.storage = new LocalStorageAdapter();
  }

  set<T>(key: string, object: T): void {
    if (!this.storage) {
      Logger.error('No storage provided.');
      return;
    }
    this.storage.set(key, JSON.stringify(object));
  }

  get<T>(key: string, defaultValue: any = null): T | null {
    if (!this.storage) {
      Logger.error('No storage provided.');
      return null;
    }

    const json: string = this.storage.get(key);

    if (json === null || json == undefined || json === '') {
      return defaultValue;
    }

    return JSON.parse(json);
  }
}
