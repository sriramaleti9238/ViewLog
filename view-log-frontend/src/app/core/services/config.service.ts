import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class ConfigService {
  private config: any = null;

  load(): Promise<void> {
    return fetch('../../../assets/config.json')
      .then(res => res.json())
      .then(data => {
        this.config = data;
        console.log('Loaded runtime config:', data);
      })
      .catch(err => console.error('Failed to load config.json', err));
  }

  get apiUrl(): string {
    return this.config?.apiUrl || '';
  }
}
