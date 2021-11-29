import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PersistanceService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.log('Error saving to localStorage', e);
    }
  }
  get(key: string) {
    try {
      return JSON.parse(localStorage.getItem(key) || '');
    } catch (e) {
      console.log('Error getting data from localStorage', e);
      return null;
    }
  }
}
