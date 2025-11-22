import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WatchItem, WatchItemCreate } from '../models/watch-item.model';
import {ConfigService} from './config.service';

@Injectable({
  providedIn: 'root'
})
export class WatchItemService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(ConfigService);

  private get apiUrl(): string {
    return this.config.apiUrl + '/watchlist';
  }

  getAll(): Observable<WatchItem[]> {
    return this.http.get<WatchItem[]>(this.apiUrl);
  }

  getById(id: number): Observable<WatchItem> {
    return this.http.get<WatchItem>(`${this.apiUrl}/${id}`);
  }

  create(item: WatchItemCreate): Observable<WatchItem> {
    return this.http.post<WatchItem>(this.apiUrl, item);
  }

  update(id: number, item: WatchItemCreate): Observable<WatchItem> {
    return this.http.put<WatchItem>(`${this.apiUrl}/${id}`, item);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  toggleWatched(id: number): Observable<WatchItem> {
    return this.http.put<WatchItem>(`${this.apiUrl}/${id}/watched`, {});
  }

  filterByType(type: string): Observable<WatchItem[]> {
    return this.http.get<WatchItem[]>(`${this.apiUrl}/type/${type}`);
  }

  filterByGenre(genre: string): Observable<WatchItem[]> {
    return this.http.get<WatchItem[]>(`${this.apiUrl}/genre/${genre}`);
  }

  filterByWatched(status: boolean): Observable<WatchItem[]> {
    return this.http.get<WatchItem[]>(`${this.apiUrl}/watched/${status}`);
  }
}
