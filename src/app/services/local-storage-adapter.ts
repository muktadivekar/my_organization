export class LocalStorageAdapter {
  get(key: string): any {
    const json = this.getRaw(key);

    if (json === null || json == undefined || json === '') {
      return null;
    }

    return JSON.parse(json);
  }

  getRaw(key: string): string | null {
    return localStorage.getItem(key);
  }

  isAvailable(): boolean {
    return localStorage != null;
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  set(key: string, object: any): void {
    localStorage.setItem(key, JSON.stringify(object));
  }
}
